/**
 * Lighting is deliberately dim and directional — "precision instrument in a
 * dark room". The violet point light is what gives the centrepiece its rim; the
 * key light only just separates the core from the background.
 */
export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#c7d2fe" />
      <pointLight position={[-3, -1.5, -2]} intensity={14} distance={14} color="#8b5cf6" />
      <pointLight position={[2.5, 2.5, 3]} intensity={6} distance={12} color="#a5b4fc" />
    </>
  )
}
