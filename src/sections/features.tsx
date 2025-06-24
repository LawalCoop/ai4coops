import {
  SiAngular,
  SiArcgis,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLeaflet,
  SiOpenlayers,
  SiPostgresql,
  SiPython,
  SiQgis,
  SiTypescript,
} from 'react-icons/si'

export default function Features() {
  const skills = [
    { text: 'ArcGIS', Icon: SiArcgis },
    { text: 'QGIS', Icon: SiQgis },
    { text: 'OpenLayers', Icon: SiOpenlayers },
    { text: 'Leaflet', Icon: SiLeaflet },
    { text: 'Python', Icon: SiPython },
    { text: 'JavaScript', Icon: SiJavascript },
    { text: 'HTML', Icon: SiHtml5 },
    { text: 'TypeScript', Icon: SiTypescript },
    { text: 'Angular', Icon: SiAngular },
    { text: 'PostGIS', Icon: SiPostgresql },
    { text: 'Version Control', Icon: SiGit },
    { text: 'Docker', Icon: SiDocker },
  ]

  return (
    <div>
      <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-bg py-[30px] font-base lg:py-[40px]">
        <div className="mx-auto w-container max-w-full px-4 sm:px-6">
          <div className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center uppercase">
              Skills and Technologies
            </h2>
          </div>
        </div>

        <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            return (
              <div
                className="border-border dark:border-darkBorder dark:bg-secondaryBlack shadow-light dark:shadow-dark flex flex-col gap-3 rounded-base border-2 bg-white p-5"
                key={i}
              >
                <h4 className="text-xl font-heading flex items-center gap-3">
                  <skill.Icon className="text-2xl" /> {/* Icon with a size */}
                  {skill.text} {/* Skill Name */}
                </h4>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
