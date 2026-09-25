import { motion } from 'framer-motion'
import { ExternalLink, GitFork, RefreshCw, Star } from 'lucide-react'
import developerData from '../../data/developer-data.json'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

function GithubIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

export default function GitHub() {
  const { github } = developerData

  // Display only core project repositories
  const projectRepoKeys = ['Startup-Foundary', 'FairPlace', 'Jarvis', 'FinanceBot', 'fairplace']
  const projectRepos = (github.featuredRepos || []).filter((repo) =>
    projectRepoKeys.some((key) => key.toLowerCase() === (repo.rawName || repo.name).toLowerCase()),
  )

  return (
    <section id="github" className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            index="06"
            title="Project Repositories & GitHub"
            lede="Open-source systems and production codebases built end to end."
          />
        </div>

        {/* Profile Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <SpotlightCard
            spotlightColor="rgba(139, 92, 246, 0.16)"
            borderColor="rgba(139, 92, 246, 0.4)"
            className="group p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                {github.avatarUrl ? (
                  <img
                    src={github.avatarUrl}
                    alt={github.name}
                    className="size-14 rounded-full border-2 border-edge object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid size-14 place-items-center rounded-full bg-surface border border-edge">
                    <GithubIcon className="size-7 text-ink transition-colors duration-200 group-hover:text-accent" />
                  </div>
                )}

                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink">
                    {github.name}
                  </h3>
                  <a
                    href={github.profileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/link font-mono text-xs text-signal hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>@{github.username}</span>
                    <ExternalLink className="size-3 text-signal transition-colors duration-200 group-hover/link:text-accent" />
                  </a>
                </div>
              </div>

              {/* Quick stats pills */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-edge bg-surface/90 px-4 py-2.5">
                  <span className="font-mono text-xs text-muted block">Public Repos</span>
                  <span className="font-display text-2xl font-bold text-ink">
                    {github.publicRepos}
                  </span>
                </div>

                <div className="rounded-xl border border-edge bg-surface/90 px-4 py-2.5">
                  <span className="font-mono text-xs text-muted block">Followers</span>
                  <span className="font-display text-2xl font-bold text-ink">
                    {github.followers}
                  </span>
                </div>

                <a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-xs font-semibold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <GithubIcon className="size-4 text-white transition-colors duration-200 group-hover/btn:text-signal" />
                  <span>View GitHub</span>
                  <ExternalLink className="size-3.5 text-white/80 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-signal" />
                </a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Project Repositories Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projectRepos.map((repo, index) => {
            const langColor = LANGUAGE_COLORS[repo.language] || '#8b5cf6'

            return (
              <motion.div
                key={repo.id || repo.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(34, 211, 238, 0.18)"
                  borderColor="rgba(34, 211, 238, 0.4)"
                  className="group p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <GithubIcon className="size-4 text-signal shrink-0 transition-colors duration-200 group-hover:text-accent" />
                        <h4 className="font-display text-lg font-semibold text-ink tracking-tight transition-colors duration-200 group-hover:text-accent">
                          {repo.name}
                        </h4>
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View ${repo.name} on GitHub`}
                        className="text-muted transition-colors hover:text-signal"
                      >
                        <ExternalLink className="size-4 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-signal" />
                      </a>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink/80">
                      {repo.description}
                    </p>

                    {/* Topics */}
                    {repo.topics?.length ? (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {repo.topics.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-edge/60 bg-surface/70 px-2 py-0.5 font-mono text-[11px] text-muted"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-6 border-t border-edge/60 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-xs text-muted">
                      {/* Language */}
                      <span className="flex items-center gap-1.5">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span>{repo.language}</span>
                      </span>

                      {/* Stars & Forks */}
                      {repo.stars > 0 ? (
                        <span className="flex items-center gap-1">
                          <Star className="size-3 text-amber-400 fill-amber-400/20" />
                          <span>{repo.stars}</span>
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3 text-muted" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-signal hover:underline"
                    >
                      <span>Open Repo</span>
                      <ExternalLink className="size-3 text-signal" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Explore All Repositories on GitHub CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/AadithyaNayakV?tab=repositories"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 rounded-full border border-edge bg-surface/90 px-6 py-3.5 font-mono text-xs font-semibold text-ink shadow-md backdrop-blur-md transition-all hover:border-signal hover:bg-surface hover:scale-[1.02] active:scale-[0.98]"
          >
            <GithubIcon className="size-4 text-signal transition-transform duration-200 group-hover:rotate-12" />
            <span>Explore All 13+ Repositories on GitHub</span>
            <ExternalLink className="size-3.5 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-signal" />
          </a>
        </div>
      </div>
    </section>
  )
}
