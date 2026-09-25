/**
 * fetch-developer-data.mjs
 * 
 * Fetches latest public stats from GitHub and LeetCode.
 * Saves to src/data/developer-data.json.
 * Safe fallback: preserves existing data if any API fails.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/developer-data.json')

const GITHUB_USERNAME = 'AadithyaNayakV'
const LEETCODE_USERNAME = 'DKSbFeaWen'

// Known repo descriptions / highlights if empty on GitHub
const REPO_FALLBACKS = {
  'Startup-Foundary': {
    name: 'Startup Foundry',
    description: 'AI-Powered Venture Intelligence Platform with Kafka microservices, 7B LLM scoring, and Next.js frontend.',
    language: 'Python',
    topics: ['fastapi', 'kafka', 'nextjs', 'ai', 'ollama'],
  },
  'FairPlace': {
    name: 'FairPlace',
    description: 'Full-stack AI-moderated marketplace platform with real-time WebSockets and RAG pricing assistance.',
    language: 'JavaScript',
    topics: ['react', 'nodejs', 'websockets', 'rag'],
  },
  'Jarvis': {
    name: 'JARVIS',
    description: 'Local voice-driven desktop assistant with offline Vosk speech recognition and Gemini API tool calling.',
    language: 'Python',
    topics: ['python', 'gemini-api', 'vosk', 'automation'],
  },
  'FinanceBot': {
    name: 'FinDad (FinanceBot)',
    description: 'AI financial guidance assistant with multi-tier RAG, Redis semantic caching, and ChromaDB vector store.',
    language: 'Python',
    topics: ['fastapi', 'langchain', 'rag', 'chromadb', 'redis'],
  },
  'DSA-leetcode-': {
    name: 'DSA LeetCode Solutions',
    description: 'Curated repository of algorithmic solutions and data structures implementations.',
    language: 'Java',
    topics: ['algorithms', 'data-structures', 'leetcode'],
  },
  'MCP-for-scraping': {
    name: 'MCP Web Scraper',
    description: 'Model Context Protocol server for intelligent web scraping and structured extraction.',
    language: 'Python',
    topics: ['mcp', 'python', 'scraping', 'ai'],
  },
}

async function loadExistingData() {
  try {
    const raw = await fs.readFile(OUTPUT_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {
      lastUpdated: null,
      github: {
        username: GITHUB_USERNAME,
        name: 'Aadithya Nayak V',
        profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        publicRepos: 13,
        followers: 9,
        featuredRepos: [],
      },
      leetcode: {
        username: LEETCODE_USERNAME,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        totalSolved: 706,
        easySolved: 345,
        mediumSolved: 324,
        hardSolved: 37,
        ranking: 96611,
        contestRating: null,
      },
    }
  }
}

async function fetchGitHubData(existing) {
  try {
    console.log(`Fetching GitHub stats for ${GITHUB_USERNAME}...`)
    const headers = {
      'User-Agent': 'developer-portfolio-sync',
      Accept: 'application/vnd.github.v3+json',
    }
    // If a GitHub token is available in GitHub Actions, use it for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers })
    if (!userRes.ok) {
      console.warn(`GitHub user API returned ${userRes.status}. Keeping previous GitHub data.`)
      return existing.github
    }
    const userData = await userRes.json()

    // Fetch user public repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      { headers }
    )
    if (!reposRes.ok) {
      console.warn(`GitHub repos API returned ${reposRes.status}. Keeping previous GitHub repos.`)
      return {
        ...existing.github,
        publicRepos: userData.public_repos ?? existing.github.publicRepos,
        followers: userData.followers ?? existing.github.followers,
      }
    }
    const reposData = await reposRes.json()

    // Filter and shape repositories: highlight top systems
    const featuredKeys = ['Startup-Foundary', 'FairPlace', 'Jarvis', 'FinanceBot', 'DSA-leetcode-', 'MCP-for-scraping']
    const repoMap = new Map(reposData.map((r) => [r.name, r]))

    // Pick featured ones first, then fill with any other active non-fork repos
    const picked = []
    for (const key of featuredKeys) {
      if (repoMap.has(key)) {
        picked.push(repoMap.get(key))
      }
    }
    for (const r of reposData) {
      if (!picked.some((p) => p.name === r.name) && !r.fork && picked.length < 6) {
        picked.push(r)
      }
    }

    const featuredRepos = picked.slice(0, 6).map((repo) => {
      const fallback = REPO_FALLBACKS[repo.name] || {}
      return {
        id: repo.id,
        name: fallback.name || repo.name,
        rawName: repo.name,
        description: repo.description || fallback.description || 'Full-stack software engineering project.',
        language: repo.language || fallback.language || 'TypeScript',
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        url: repo.html_url,
        updatedAt: repo.updated_at,
        topics: repo.topics?.length ? repo.topics : fallback.topics || [],
      }
    })

    return {
      username: userData.login || GITHUB_USERNAME,
      name: userData.name || 'Aadithya Nayak V',
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`,
      publicRepos: userData.public_repos ?? existing.github.publicRepos,
      followers: userData.followers ?? existing.github.followers,
      featuredRepos: featuredRepos.length > 0 ? featuredRepos : existing.github.featuredRepos,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message)
    return existing.github
  }
}

async function fetchLeetCodeData(existing) {
  try {
    console.log(`Fetching LeetCode stats for ${LEETCODE_USERNAME}...`)
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            realName
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          topPercentage
          totalParticipants
        }
      }
    `

    const res = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
    })

    if (!res.ok) {
      console.warn(`LeetCode GraphQL returned ${res.status}. Keeping previous LeetCode data.`)
      return existing.leetcode
    }

    const payload = await res.json()
    const user = payload?.data?.matchedUser

    if (!user) {
      console.warn('LeetCode matchedUser not found. Keeping previous LeetCode data.')
      return existing.leetcode
    }

    const stats = user.submitStatsGlobal?.acSubmissionNum || []
    const getCount = (diff) => {
      const match = stats.find((s) => s.difficulty.toLowerCase() === diff.toLowerCase())
      return match ? match.count : 0
    }

    const totalSolved = getCount('all')
    const easySolved = getCount('easy')
    const mediumSolved = getCount('medium')
    const hardSolved = getCount('hard')
    const ranking = user.profile?.ranking || existing.leetcode?.ranking || null
    const contestRanking = payload?.data?.userContestRanking
    const contestRating = contestRanking?.rating ? Math.round(contestRanking.rating) : null

    return {
      username: user.username || LEETCODE_USERNAME,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      totalSolved: totalSolved || existing.leetcode.totalSolved,
      easySolved: easySolved || existing.leetcode.easySolved,
      mediumSolved: mediumSolved || existing.leetcode.mediumSolved,
      hardSolved: hardSolved || existing.leetcode.hardSolved,
      ranking: ranking,
      contestRating: contestRating,
      contestRank: contestRanking?.globalRanking || null,
      topPercentage: contestRanking?.topPercentage || null,
    }
  } catch (error) {
    console.error('Error fetching LeetCode data:', error.message)
    return existing.leetcode
  }
}

async function main() {
  const existing = await loadExistingData()
  const github = await fetchGitHubData(existing)
  const leetcode = await fetchLeetCodeData(existing)

  const output = {
    lastUpdated: new Date().toISOString(),
    github,
    leetcode,
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf-8')
  console.log(`Successfully updated developer data at: ${OUTPUT_FILE}`)
}

main().catch((err) => {
  console.error('Fatal error during data sync:', err)
  process.exit(1)
})
