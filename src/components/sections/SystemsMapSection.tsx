import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as d3 from 'd3';
import { Plus, Info } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  description: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  label: string;
}

const initialNodes: Node[] = [
  { id: '1', label: '[Add Concept 1]', description: 'Click to add description' },
  { id: '2', label: '[Add Concept 2]', description: 'Click to add description' },
  { id: '3', label: '[Add Concept 3]', description: 'Click to add description' },
];

const initialLinks: Link[] = [
  { source: '1', target: '2', label: 'relates to' },
  { source: '2', target: '3', label: 'influences' },
  { source: '1', target: '3', label: 'enables' },
];

const SystemsMapSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.min(width - 40, 1000),
          height: Math.min(500, window.innerHeight * 0.5)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !isInView) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create the simulation
    const simulation = d3.forceSimulation<Node>(initialNodes)
      .force('link', d3.forceLink<Node, Link>(initialLinks).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Add glow filter
    const defs = svg.append('defs');
    
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(initialLinks)
      .join('line')
      .attr('stroke', 'hsl(180, 100%, 50%)')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 2)
      .style('filter', 'url(#glow)');

    // Create link labels
    const linkLabels = svg.append('g')
      .selectAll('text')
      .data(initialLinks)
      .join('text')
      .attr('font-size', '10px')
      .attr('fill', 'hsl(0, 0%, 60%)')
      .attr('text-anchor', 'middle')
      .text(d => d.label);

    // Create node groups
    const node = svg.append('g')
      .selectAll('g')
      .data(initialNodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Node circles
    const colors = ['hsl(180, 100%, 50%)', 'hsl(330, 100%, 50%)', 'hsl(270, 100%, 70%)'];
    
    node.append('circle')
      .attr('r', 40)
      .attr('fill', 'hsl(230, 25%, 12%)')
      .attr('stroke', (_, i) => colors[i % colors.length])
      .attr('stroke-width', 2)
      .style('filter', 'url(#glow)')
      .on('mouseover', function() {
        d3.select(this).attr('stroke-width', 3);
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke-width', 2);
      })
      .on('click', (_, d) => {
        setSelectedNode(d);
      });

    // Node labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text(d => d.label.length > 15 ? d.label.slice(0, 12) + '...' : d.label)
      .style('pointer-events', 'none');

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      linkLabels
        .attr('x', d => ((d.source as Node).x! + (d.target as Node).x!) / 2)
        .attr('y', d => ((d.source as Node).y! + (d.target as Node).y!) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions, isInView]);

  return (
    <section id="systems-map" className="py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header">Systems Map</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            How my interests connect and reinforce each other
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          ref={containerRef}
        >
          {/* Graph container */}
          <div className="card-punk rounded-xl p-4 overflow-hidden">
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="mx-auto"
            />
            
            {/* Instructions */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4" />
              <span>Click nodes to view details. Drag to rearrange.</span>
            </div>

            {/* Add node button */}
            <button className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm hover:bg-primary/20 transition-colors">
              <Plus className="w-4 h-4" />
              Add Concept
            </button>
          </div>

          {/* Selected node details */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-card border border-border"
            >
              <h3 className="font-mono font-bold text-primary mb-2">
                {selectedNode.label}
              </h3>
              <p className="text-muted-foreground text-sm">
                {selectedNode.description}
              </p>
              <button
                onClick={() => setSelectedNode(null)}
                className="mt-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SystemsMapSection;
