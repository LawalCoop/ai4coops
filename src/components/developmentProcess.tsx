import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaLightbulb,
  FaSearch,
  FaPencilRuler,
  FaTools,
  FaCheckCircle,
  FaRocket,
} from 'react-icons/fa'

const steps = [
  {
    id: 1,
    title: 'IDEA',
    text: 'Everything starts with your idea. Let us know what you want and we can begin.',
    icon: <FaLightbulb />,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'RESEARCH',
    text: 'We research what you like from other websites, colors, functions, and navigation.',
    icon: <FaSearch />,
    color: 'bg-indigo-500',
  },
  {
    id: 3,
    title: 'DESIGN',
    text: 'Your website is storyboarded by our designers, drawing out the layout.',
    icon: <FaPencilRuler />,
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    title: 'BUILD',
    text: 'Once you are happy with the design, our team starts building your site.',
    icon: <FaTools />,
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'TEST',
    text: 'We test everything to make sure it works as designed.',
    icon: <FaCheckCircle />,
    color: 'bg-green-500',
  },
  {
    id: 6,
    title: 'LAUNCH',
    text: 'Your website is unveiled to the public, and we stay available for support.',
    icon: <FaRocket />,
    color: 'bg-red-500',
  },
]

export default function DevProcess() {
  const [selectedStep, setSelectedStep] = useState(null)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 relative">
      <h2 className="text-3xl font-bold mb-6">Our Web Development Process</h2>
      <div className="relative w-96 h-96 flex items-center justify-center">
        {steps.map((step, index) => {
          const angle = (index / steps.length) * 360
          return (
            <motion.div
              key={step.id}
              className={`absolute w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-[8px_8px_0px_0px_black] transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black] transition-all duration-300 cursor-pointer ${step.color}`}
              style={{
                transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
              }}
              onMouseEnter={() => setSelectedStep(step)}
              onMouseLeave={() => setSelectedStep(null)}
            >
              {step.icon}
              <span>{step.title}</span>
            </motion.div>
          )
        })}
      </div>
      {selectedStep && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="absolute top-1/2 left-[450px] bg-white p-4 text-black shadow-lg w-64"
        >
          <div className="flex items-center mb-2">
            <span className="mr-2 text-lg">{selectedStep.icon}</span>
            <h3 className="text-lg font-bold">{selectedStep.title}</h3>
          </div>
          <p>{selectedStep.text}</p>
        </motion.div>
      )}
    </div>
  )
}
