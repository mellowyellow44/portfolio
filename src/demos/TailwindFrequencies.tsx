import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as Tone from "tone";

// Define chakra data with frequencies, colors, and descriptions
const CHAKRA_DATA = [
  {
    name: "Root",
    frequency: 396,
    color: "#FF0000",
    element: "Earth",
    note: "G",
    description: "Foundation, stability, grounding",
    location: "Base of spine",
  },
  {
    name: "Sacral",
    frequency: 417,
    color: "#FF7F00",
    element: "Water",
    note: "G#",
    description: "Creativity, emotion, sexuality",
    location: "Lower abdomen",
  },
  {
    name: "Solar Plexus",
    frequency: 528,
    color: "#FFFF00",
    element: "Fire",
    note: "C",
    description: "Personal power, will, transformation",
    location: "Upper abdomen",
  },
  {
    name: "Heart",
    frequency: 639,
    color: "#00FF00",
    element: "Air",
    note: "E",
    description: "Love, compassion, harmony",
    location: "Center of chest",
  },
  {
    name: "Throat",
    frequency: 741,
    color: "#0000FF",
    element: "Ether",
    note: "F#",
    description: "Communication, expression, truth",
    location: "Throat",
  },
  {
    name: "Third Eye",
    frequency: 852,
    color: "#4B0082",
    element: "Light",
    note: "A",
    description: "Intuition, perception, wisdom",
    location: "Forehead center",
  },
  {
    name: "Crown",
    frequency: 963,
    color: "#9400D3",
    element: "Cosmic Energy",
    note: "B",
    description: "Consciousness, connection, enlightenment",
    location: "Top of head",
  },
];

// Define sacred geometry ratios
const SACRED_RATIOS = [
  { name: "Golden Ratio (φ)", value: 1.618033988749895, symbol: "φ" },
  { name: "Silver Ratio (√2)", value: 1.414213562373095, symbol: "√2" },
  { name: "Pi (π)", value: Math.PI, symbol: "π" },
  { name: "Octave", value: 2, symbol: "2:1" },
  { name: "Perfect Fifth", value: 1.5, symbol: "3:2" },
  { name: "Perfect Fourth", value: 1.333, symbol: "4:3" },
];

const HarmonicVisualizer = () => {
  const svgRef = useRef(null);
  const [currentFrequency, setCurrentFrequency] = useState(432);
  const [baseFrequency, setBaseFrequency] = useState(432);
  const [selectedChakra, setSelectedChakra] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);
  const [visualizationMode, setVisualizationMode] = useState("spiral");
  const [harmonics, setHarmonics] = useState([1, 1.5, 2, 2.5, 3]);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const animationRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    newSynth.volume.value = -10;
    setSynth(newSynth as any);

    return () => {
      newSynth.dispose();
    };
  }, []);

  // Handle playing sounds
  const playChakraSound = async (frequency: number) => {
    if (!synth) return;

    await Tone.start();
    const now = Tone.now();

    // Play the base frequency
    (synth as any).triggerAttackRelease(frequency, "4n", now);

    // Play harmonics with decreasing volume
    harmonics.forEach((harmonic: any, i: any) => {
      if (harmonic !== 1) { // Skip the fundamental which we already played
        (synth as any).triggerAttackRelease(
          frequency * harmonic,
          "4n",
          now + 0.1 * i,
          0.7 / (i + 1),
        );
      }
    });
  };

  // Toggle continuous play
  const togglePlay = async () => {
    if (!synth) return;

    if (!isPlaying) {
      await Tone.start();

      const loop = new Tone.Loop((time) => {
        (synth as any).triggerAttackRelease(currentFrequency, "16n", time, 0.5);
      }, "4n").start(0);

      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setIsPlaying(false);
    }
  };

  // Select a chakra
  const selectChakra = (
    chakra: {
      name?: string;
      frequency: any;
      color?: string;
      element?: string;
      note?: string;
      description?: string;
      location?: string;
    },
  ) => {
    setSelectedChakra(chakra as any);
    setCurrentFrequency(chakra.frequency);
    playChakraSound(chakra.frequency);
  };

  // Apply a sacred ratio to the current frequency
  const applyRatio = (
    ratio: { name?: string; value: any; symbol?: string },
  ) => {
    const newFrequency = baseFrequency * ratio.value;
    setCurrentFrequency(newFrequency);
    playChakraSound(newFrequency);
  };

  // Create main visualization
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous visualization and animation
    d3.select(svgRef.current).selectAll("*").remove();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#111")
      .attr("rx", 8)
      .attr("ry", 8);

    // Draw based on selected visualization mode
    if (visualizationMode === "spiral") {
      // Create spiral visualization
      const spiralGroup = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`);

      const numPoints = 1000;
      const maxRadius = Math.min(width, height) * 0.45;

      // Base frequencies for comparison
      const allFrequencies = CHAKRA_DATA.map((c) => c.frequency);

      // Find closest chakra frequency
      const getClosestChakra = (freq: any) => {
        let closest = CHAKRA_DATA[0];
        let minDiff = Math.abs(freq - closest.frequency);

        CHAKRA_DATA.forEach((chakra) => {
          const diff = Math.abs(freq - chakra.frequency);
          if (diff < minDiff) {
            minDiff = diff;
            closest = chakra;
          }
        });

        return closest;
      };

      // Create harmonic frequencies
      const frequencyPoints: {
        frequency: any;
        harmonic: any;
        chakra: {
          name: string;
          frequency: any;
          color: string;
          element: string;
          note: string;
          description: string;
          location: string;
        };
        color: string;
      }[] = [];
      harmonics.forEach((harmonic: number) => {
        const freq = currentFrequency * harmonic;
        const closestChakra = getClosestChakra(freq);

        frequencyPoints.push({
          frequency: freq,
          harmonic: harmonic,
          chakra: closestChakra,
          color: d3.interpolateRgb(closestChakra.color, "#ffffff")(0.5),
        });
      });

      // Animation function
      let phase = 0;

      const animateSpiral = () => {
        phase += 0.01 * animationSpeed;

        // Clear previous spiral
        spiralGroup.selectAll(".spiral-path").remove();
        spiralGroup.selectAll(".frequency-point").remove();

        // Create spiral for each frequency
        frequencyPoints.forEach((point, pIndex) => {
          const spiralData = [];
          const spiralSegments = 500;
          const waveFreq = point.frequency / 100;
          const waveAmplitude = 3;

          for (let i = 0; i <= spiralSegments; i++) {
            const t = i / spiralSegments;
            const angle = t * Math.PI * 24 + phase;
            const radius = t * maxRadius;
            const wave = Math.sin(angle * waveFreq + phase) * waveAmplitude * t;

            spiralData.push({
              x: Math.cos(angle) * (radius + wave),
              y: Math.sin(angle) * (radius + wave),
            });
          }

          // Define spiral line
          const spiralLine = d3.line()
            .x((d: any) => d.x)
            .y((d: any) => d.y)
            .curve(d3.curveBasis);

          // Draw spiral path
          spiralGroup.append("path")
            .datum(spiralData)
            .attr("class", "spiral-path")
            .attr("d", spiralLine as any)
            .attr("fill", "none")
            .attr("stroke", point.color)
            .attr("stroke-width", 2 - (pIndex * 0.2))
            .attr("stroke-opacity", 0.8 - (pIndex * 0.1))
            .attr("filter", "url(#glow)");

          // Draw frequency point
          const endPoint = spiralData[spiralData.length - 1];
          spiralGroup.append("circle")
            .attr("class", "frequency-point")
            .attr("cx", endPoint.x)
            .attr("cy", endPoint.y)
            .attr("r", 10 - pIndex)
            .attr("fill", point.color)
            .attr("filter", "url(#glow)");
        });

        (animationRef as any).current = requestAnimationFrame(animateSpiral);
      };

      // Define glow filter
      const defs = svg.append("defs");

      const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("width", "300%")
        .attr("height", "300%")
        .attr("x", "-100%")
        .attr("y", "-100%");

      filter.append("feGaussianBlur")
        .attr("stdDeviation", "4")
        .attr("result", "coloredBlur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // Start animation
      animateSpiral();
    } else if (visualizationMode === "mandala") {
      // Create mandala visualization
      const mandalaGroup = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`);

      // Define glow filter
      const defs = svg.append("defs");
      const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("width", "300%")
        .attr("height", "300%")
        .attr("x", "-100%")
        .attr("y", "-100%");

      filter.append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // Find closest chakra
      const getClosestChakra = (freq: any) => {
        let closest = CHAKRA_DATA[0];
        let minDiff = Math.abs(freq - closest.frequency);

        CHAKRA_DATA.forEach((chakra) => {
          const diff = Math.abs(freq - chakra.frequency);
          if (diff < minDiff) {
            minDiff = diff;
            closest = chakra;
          }
        });

        return closest;
      };

      const closestChakra = getClosestChakra(currentFrequency);
      const baseColor = d3.rgb(closestChakra.color);

      // Animation variables
      let rotation = 0;
      let pulseSize = 0;

      const animateMandala = () => {
        rotation += 0.2 * animationSpeed;
        pulseSize = Math.sin(rotation / 30) * 5;

        // Clear previous mandala
        mandalaGroup.selectAll(".mandala-element").remove();

        // Get frequency ratios based on harmonics
        const freqRatios = harmonics.map((h: any) => currentFrequency * h);

        // Calculate number of petals based on frequency
        const numPetals = Math.round(currentFrequency / 100) * 2;
        const numLayers = harmonics.length;
        const maxRadius = Math.min(width, height) * 0.45;

        // Draw mandala layers
        for (let layer = 0; layer < numLayers; layer++) {
          const layerRadius = (maxRadius * (layer + 1)) / numLayers;
          const frequency = freqRatios[layer];
          const chakra = getClosestChakra(frequency);
          const layerColor = d3.rgb(chakra.color);

          // Adjust number of petals for each layer
          const layerPetals = Math.round(numPetals * harmonics[layer]);

          // Draw petals
          for (let i = 0; i < layerPetals; i++) {
            const angle = (i / layerPetals) * Math.PI * 2;
            const petalLength = layerRadius * 0.7 + pulseSize;

            // Draw outer petal shape
            const petalPath = [
              { x: 0, y: 0 },
              {
                x: Math.cos(angle - 0.2) * petalLength * 0.5,
                y: Math.sin(angle - 0.2) * petalLength * 0.5,
              },
              {
                x: Math.cos(angle) * petalLength,
                y: Math.sin(angle) * petalLength,
              },
              {
                x: Math.cos(angle + 0.2) * petalLength * 0.5,
                y: Math.sin(angle + 0.2) * petalLength * 0.5,
              },
            ];

            const linePath = d3.line()
              .x((d: any) => d.x)
              .y((d: any) => d.y)
              .curve(d3.curveBasis);

            mandalaGroup.append("path")
              .attr("class", "mandala-element")
              .attr("d", linePath(petalPath as any))
              .attr("fill", "none")
              .attr("stroke", (d3 as any).color(chakra.color).brighter(0.5))
              .attr("stroke-width", 1.5)
              .attr("transform", `rotate(${rotation * (layer % 2 ? -1 : 1)})`)
              .attr("opacity", 0.9 - (layer * 0.1))
              .attr("filter", "url(#glow)");
          }

          // Draw connecting circle
          mandalaGroup.append("circle")
            .attr("class", "mandala-element")
            .attr("r", layerRadius / 3)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "none")
            .attr("stroke", layerColor as any)
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", `${Math.PI * 2}`)
            .attr("stroke-dashoffset", rotation * 2)
            .attr("opacity", 0.7)
            .attr("filter", "url(#glow)");
        }

        // Draw center
        mandalaGroup.append("circle")
          .attr("class", "mandala-element")
          .attr("r", 10 + pulseSize)
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("fill", baseColor as any)
          .attr("opacity", 0.7)
          .attr("filter", "url(#glow)");

        (animationRef as any).current = requestAnimationFrame(animateMandala);
      };

      // Start animation
      animateMandala();
    }

    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentFrequency, visualizationMode, harmonics, animationSpeed]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center gradient-text">
          Chakra Frequency Harmonic Visualizer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main visualization */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
              <div>
                <div className="text-sm opacity-70">Current Frequency</div>
                <div className="text-2xl font-bold">
                  {currentFrequency.toFixed(1)} Hz
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setVisualizationMode("spiral")}
                  className={`px-3 py-1 rounded ${
                    visualizationMode === "spiral"
                      ? "bg-indigo-600"
                      : "bg-gray-700"
                  }`}
                >
                  Spiral
                </button>
                <button
                  onClick={() => setVisualizationMode("mandala")}
                  className={`px-3 py-1 rounded ${
                    visualizationMode === "mandala"
                      ? "bg-indigo-600"
                      : "bg-gray-700"
                  }`}
                >
                  Mandala
                </button>
                <button
                  onClick={togglePlay}
                  className={`px-3 py-1 rounded ${
                    isPlaying ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {isPlaying ? "Stop Sound" : "Play Sound"}
                </button>
              </div>
            </div>

            <svg ref={svgRef} width="600" height="600" className="mx-auto">
            </svg>

            <div className="mt-4">
              <label className="block text-sm mb-1">Animation Speed</label>
              <input
                type="range"
                min="1"
                max="10"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Controls and info */}
          <div className="space-y-6">
            {/* Chakra Selection */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Chakras</h2>
              <div className="grid grid-cols-1 gap-2">
                {CHAKRA_DATA.map((chakra) => (
                  <button
                    key={chakra.name}
                    onClick={() => selectChakra(chakra)}
                    className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
                    style={{ borderLeft: `4px solid ${chakra.color}` }}
                  >
                    <div
                      className="w-6 h-6 rounded-full mr-3"
                      style={{ backgroundColor: chakra.color }}
                    >
                    </div>
                    <div>
                      <div className="font-medium">{chakra.name}</div>
                      <div className="text-xs opacity-70">
                        {chakra.frequency} Hz - {chakra.note}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Frequency */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Base Frequency</h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBaseFrequency(432);
                      setCurrentFrequency(432);
                    }}
                    className={`px-3 py-1 rounded ${
                      baseFrequency === 432 ? "bg-indigo-600" : "bg-gray-700"
                    }`}
                  >
                    432 Hz
                  </button>
                  <button
                    onClick={() => {
                      setBaseFrequency(528);
                      setCurrentFrequency(528);
                    }}
                    className={`px-3 py-1 rounded ${
                      baseFrequency === 528 ? "bg-indigo-600" : "bg-gray-700"
                    }`}
                  >
                    528 Hz
                  </button>
                  <button
                    onClick={() => {
                      setBaseFrequency(440);
                      setCurrentFrequency(440);
                    }}
                    className={`px-3 py-1 rounded ${
                      baseFrequency === 440 ? "bg-indigo-600" : "bg-gray-700"
                    }`}
                  >
                    440 Hz
                  </button>
                </div>

                <input
                  type="range"
                  min="256"
                  max="963"
                  step="1"
                  value={baseFrequency}
                  onChange={(e) => {
                    const freq = parseFloat(e.target.value);
                    setBaseFrequency(freq);
                    setCurrentFrequency(freq);
                  }}
                  className="w-full"
                />
                <div className="text-center text-sm opacity-70">
                  Base: {baseFrequency} Hz
                </div>
              </div>
            </div>

            {/* Sacred Geometry Ratios */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">
                Sacred Geometry Ratios
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {SACRED_RATIOS.map((ratio) => (
                  <button
                    key={ratio.name}
                    onClick={() => applyRatio(ratio)}
                    className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors text-center"
                  >
                    <div className="font-medium">{ratio.symbol}</div>
                    <div className="text-xs opacity-70">
                      {baseFrequency} × {ratio.value.toFixed(3)} ={" "}
                      {(baseFrequency * ratio.value).toFixed(1)} Hz
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Harmonics */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Harmonic Series</h2>
              <div className="flex flex-wrap gap-2">
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((harmonic) => (
                  <button
                    key={harmonic}
                    onClick={() => {
                      // Toggle this harmonic
                      if (harmonics.includes(harmonic)) {
                        setHarmonics(harmonics.filter((h:any) => h !== harmonic));
                      } else {
                        setHarmonics([...harmonics, harmonic]);
                      }
                    }}
                    className={`px-3 py-1 rounded ${
                      harmonics.includes(harmonic)
                        ? "bg-indigo-600"
                        : "bg-gray-700"
                    }`}
                  >
                    {harmonic}×
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info about selected chakra or frequency */}
        {selectedChakra && (
          <div className="mt-6 bg-gray-800 rounded-xl p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: (selectedChakra as any).color }}
              >
              </span>
              {(selectedChakra as any).name} Chakra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm opacity-70">Frequency</div>
                <div>{(selectedChakra as any).frequency} Hz</div>
              </div>
              <div>
                <div className="text-sm opacity-70">Element</div>
                <div>{(selectedChakra as any).element}</div>
              </div>
              <div>
                <div className="text-sm opacity-70">Location</div>
                <div>{(selectedChakra as any).location}</div>
              </div>
              <div className="md:col-span-3">
                <div className="text-sm opacity-70">Description</div>
                <div>{(selectedChakra as any).description}</div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default HarmonicVisualizer;
