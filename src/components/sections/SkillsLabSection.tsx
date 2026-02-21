import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Shield, BarChart3, Atom, Telescope, Activity, Send, Check, X, Lock, Eye, EyeOff, HelpCircle } from 'lucide-react';

// Demo 1: AI Chatbot – keyword-based portfolio responses
function getBotResponse(userInput: string): string {
  const q = userInput.toLowerCase().trim();
  if (q.includes('skill') || q.includes('tech') || q.includes('know')) {
    return "I work with React, TypeScript, Python, SQL, cloud (OCI), and love cybersecurity, AI/ML, and quantum computing. Check the Skills section for the full list!";
  }
  if (q.includes('project') || q.includes('built') || q.includes('build')) {
    return "I'm building this portfolio and have more projects in the pipeline. The Work section has what I've shipped so far.";
  }
  if (q.includes('yourself') || q.includes('about you') || q.includes('who are you')) {
    return "I'm Murtuza — into quantum, space, code, and photography. Scroll the site to see certs, projects, and what I'm learning.";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return "Use the Let's Talk button or the contact links in the hero. I'm happy to chat!";
  }
  if (q.includes('cert') || q.includes('course') || q.includes('learn')) {
    return "I've got certs from Oracle (OCI, Gen AI), Kaggle, Forage, and more. See the Certifications section for verifiable credentials.";
  }
  return "That's a good question! For skills, projects, or background, try the suggestions above — or just scroll around the site.";
}

const ChatbotDemo = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm the portfolio bot. Ask about skills, projects, or background — or try the quick questions below." }
  ]);
  const [input, setInput] = useState('');

  const exampleQuestions = [
    "What are your skills?",
    "Tell me about yourself",
    "What projects have you built?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: getBotResponse(userText) }]);
    }, 400);
  };

  return (
    <div className="h-80 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex gap-2 mb-3 flex-wrap">
          {exampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo 2: Password Strength Checker
const PasswordDemo = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    noCommon: !['password', '123456', 'qwerty'].some(p => password.toLowerCase().includes(p))
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;
  const strength = passedChecks <= 2 ? 'Weak' : passedChecks <= 4 ? 'Medium' : 'Strong';
  const strengthColor = strength === 'Weak' ? 'text-destructive' : strength === 'Medium' ? 'text-warning' : 'text-success';
  const entropy = password.length * Math.log2(
    (checks.lowercase ? 26 : 0) + 
    (checks.uppercase ? 26 : 0) + 
    (checks.number ? 10 : 0) + 
    (checks.special ? 32 : 0) || 1
  );

  return (
    <div className="p-6 space-y-4">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to test..."
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-12"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {password && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Strength:</span>
            <span className={`font-mono font-bold ${strengthColor}`}>{strength}</span>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                strength === 'Weak' ? 'bg-destructive w-1/3' : 
                strength === 'Medium' ? 'bg-warning w-2/3' : 
                'bg-success w-full'
              }`}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Entropy: <span className="font-mono text-primary">{entropy.toFixed(1)} bits</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { key: 'length', label: '12+ characters' },
              { key: 'uppercase', label: 'Uppercase' },
              { key: 'lowercase', label: 'Lowercase' },
              { key: 'number', label: 'Numbers' },
              { key: 'special', label: 'Special chars' },
              { key: 'noCommon', label: 'No common words' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                {checks[key as keyof typeof checks] ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <X className="w-4 h-4 text-destructive" />
                )}
                <span className={checks[key as keyof typeof checks] ? 'text-foreground' : 'text-muted-foreground'}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Demo 3: Data Visualization – CSV/JSON upload
const DEFAULT_VIZ_DATA = [
  { label: 'Jan', value: 0 },
  { label: 'Feb', value: 0 },
  { label: 'Mar', value: 0 },
  { label: 'Apr', value: 0 },
  { label: 'May', value: 0 },
  { label: 'Jun', value: 0 },
];

function parseVizFile(content: string, filename: string): { label: string; value: number }[] {
  const ext = filename.toLowerCase();
  if (ext.endsWith('.json')) {
    const parsed = JSON.parse(content) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((item: unknown) => {
        const o = item as Record<string, unknown>;
        const label = String(o?.label ?? o?.name ?? o?.x ?? '');
        const value = Number(o?.value ?? o?.y ?? 0);
        return { label: String(label), value: Number.isNaN(value) ? 0 : value };
      });
    }
    const obj = parsed as Record<string, unknown>;
    const labels = (obj.labels ?? obj.x ?? []) as string[];
    const values = (obj.values ?? obj.y ?? []) as number[];
    return (labels as string[]).map((l, i) => ({ label: l, value: Number(values[i]) || 0 }));
  }
  if (ext.endsWith('.csv')) {
    const lines = content.trim().split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim());
    const labelCol = headers.find(h => /label|name|x|category/i.test(h)) ?? headers[0];
    const valueCol = headers.find(h => /value|y|count|amount/i.test(h)) ?? headers[1];
    const li = headers.indexOf(labelCol);
    const vi = headers.indexOf(valueCol);
    return lines.slice(1).map(line => {
      const parts = line.split(',').map(p => p.trim());
      return { label: parts[li] ?? '', value: Number(parts[vi]) || 0 };
    });
  }
  return DEFAULT_VIZ_DATA;
}

const DataVizDemo = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [data, setData] = useState<{ label: string; value: number }[]>(DEFAULT_VIZ_DATA);
  const [fileName, setFileName] = useState<string | null>(null);

  const maxValue = Math.max(...data.map(d => d.value), 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseVizFile(reader.result as string, file.name);
        if (parsed.length) {
          setData(parsed);
          setFileName(file.name);
        }
      } catch {
        setData(DEFAULT_VIZ_DATA);
        setFileName(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 flex-wrap items-center">
        <button
          onClick={() => setChartType('bar')}
          className={`px-3 py-1 rounded text-sm ${chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          Bar
        </button>
        <button
          onClick={() => setChartType('line')}
          className={`px-3 py-1 rounded text-sm ${chartType === 'line' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          Line
        </button>
      </div>

      <div className="h-48 flex items-end justify-around gap-2 border-b border-l border-border p-4">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1 min-w-0">
            {chartType === 'bar' ? (
              <div
                className="w-full bg-primary/20 border-2 border-primary rounded-t flex items-center justify-center transition-all"
                style={{ height: `${Math.max(8, (d.value / maxValue) * 120)}px` }}
              >
                <span className="text-xs text-muted-foreground truncate max-w-full">{d.value}</span>
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full border-2 border-primary bg-background" />
            )}
            <span className="text-xs text-muted-foreground truncate max-w-full" title={d.label}>{d.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-sm text-muted-foreground italic">
          {fileName ? `Loaded: ${fileName}` : 'Upload CSV or JSON to visualize'}
        </label>
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleFileChange}
          className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-primary file:bg-primary/10 file:text-primary"
        />
      </div>
    </div>
  );
};

// Demo 4: Quantum Circuit
const QuantumDemo = () => {
  const [gates, setGates] = useState<string[]>([]);
  const gateOptions = [
    { id: 'H', name: 'Hadamard', desc: 'Creates superposition' },
    { id: 'X', name: 'Pauli-X', desc: 'Bit flip (NOT gate)' },
    { id: 'Z', name: 'Pauli-Z', desc: 'Phase flip' },
    { id: 'CNOT', name: 'CNOT', desc: 'Controlled NOT' },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 flex-wrap">
        {gateOptions.map(gate => (
          <div key={gate.id} className="relative group">
            <button
              onClick={() => setGates([...gates, gate.id])}
              className="px-4 py-2 rounded bg-tertiary/20 border border-tertiary/50 text-tertiary hover:bg-tertiary/30 font-mono text-sm"
            >
              {gate.id}
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {gate.desc}
            </div>
          </div>
        ))}
        <button
          onClick={() => setGates([])}
          className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80 text-sm"
        >
          Reset
        </button>
      </div>

      <div className="bg-card-elevated rounded-lg p-4 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          <span className="font-mono text-sm text-muted-foreground w-12">|0⟩</span>
          <div className="h-0.5 w-8 bg-primary" />
          {gates.length === 0 ? (
            <span className="text-muted-foreground text-sm italic px-4">Add gates above</span>
          ) : (
            gates.map((gate, i) => (
              <div key={i} className="flex items-center">
                <div className="w-10 h-10 rounded border-2 border-primary flex items-center justify-center font-mono text-primary text-sm">
                  {gate}
                </div>
                <div className="h-0.5 w-4 bg-primary" />
              </div>
            ))
          )}
          <span className="font-mono text-sm text-primary">→ |ψ⟩</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        State: <span className="font-mono text-tertiary">
          {gates.length === 0 ? '|0⟩' : gates.includes('H') ? '(|0⟩ + |1⟩)/√2' : gates.includes('X') ? '|1⟩' : '|0⟩'}
        </span>
      </div>
    </div>
  );
};

// Demo 5: Exoplanet Calculator
const AstroDemo = () => {
  const [starType, setStarType] = useState('sun');
  const [distance, setDistance] = useState(1);

  const starData: Record<string, { luminosity: number; name: string; color: string }> = {
    sun: { luminosity: 1, name: 'Sun-like (G-type)', color: '#ffff00' },
    red_dwarf: { luminosity: 0.04, name: 'Red Dwarf (M-type)', color: '#ff6b6b' },
    blue_giant: { luminosity: 10000, name: 'Blue Giant (O-type)', color: '#6bb3ff' },
    red_giant: { luminosity: 100, name: 'Red Giant', color: '#ff9500' },
  };

  const star = starData[starType];
  const innerHZ = 0.95 * Math.sqrt(star.luminosity);
  const outerHZ = 1.37 * Math.sqrt(star.luminosity);

  let zone = 'habitable';
  if (distance < innerHZ) zone = 'too_hot';
  if (distance > outerHZ) zone = 'too_cold';

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Star Type</label>
          <select
            value={starType}
            onChange={(e) => setStarType(e.target.value)}
            className="w-full px-3 py-2 rounded bg-input border border-border text-foreground"
          >
            {Object.entries(starData).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Distance (AU): {distance.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Visual diagram */}
      <div className="relative h-24 bg-card-elevated rounded-lg overflow-hidden">
        {/* Star */}
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{ backgroundColor: star.color, boxShadow: `0 0 20px ${star.color}` }}
        />
        
        {/* Habitable zone */}
        <div 
          className="absolute top-0 h-full bg-success/20 border-x border-success/50"
          style={{ 
            left: `${(innerHZ / 5) * 100 + 10}%`,
            width: `${((outerHZ - innerHZ) / 5) * 100}%`
          }}
        />
        
        {/* Planet */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-primary-glow transition-all duration-300"
          style={{ left: `${(distance / 5) * 100 + 10}%` }}
        />
      </div>

      <div className={`text-center font-mono font-bold ${
        zone === 'habitable' ? 'text-success' : 
        zone === 'too_hot' ? 'text-destructive' : 'text-primary'
      }`}>
        {zone === 'habitable' ? '✓ In Habitable Zone' :
         zone === 'too_hot' ? '🔥 Too Hot (Inside HZ)' : '❄️ Too Cold (Outside HZ)'}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Habitable zone: {innerHZ.toFixed(2)} - {outerHZ.toFixed(2)} AU
      </p>
    </div>
  );
};

// Demo 6: Status Dashboard
const StatusDemo = () => {
  const metrics = [
    { label: 'Uptime', value: '--', icon: Activity, status: 'pending' },
    { label: 'Response Time', value: '--', icon: Activity, status: 'pending' },
    { label: 'Visitors', value: '--', icon: Activity, status: 'pending' },
    { label: 'CPU Load', value: '--', icon: Activity, status: 'pending' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="p-4 rounded-lg bg-card-elevated border border-border">
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </div>
            <div className="font-mono text-2xl text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-1">Configure monitoring</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center mt-4 italic">
        Connect to real metrics endpoint for live data
      </p>
    </div>
  );
};

const demos = [
  {
    id: 'chatbot',
    title: 'AI Chatbot Assistant',
    description: "An AI that thinks it knows me. It doesn't. But it tries.",
    icon: Bot,
    tech: ['NLP', 'React'],
    component: ChatbotDemo,
  },
  {
    id: 'password',
    title: 'Password Strength Checker',
    description: "Password strength analyzer that's probably more secure than my life choices",
    icon: Shield,
    tech: ['Cybersecurity', 'Client-side'],
    component: PasswordDemo,
  },
  {
    id: 'dataviz',
    title: 'Data Visualization',
    description: "Making data look pretty so people actually pay attention",
    icon: BarChart3,
    tech: ['D3.js', 'Analytics'],
    component: DataVizDemo,
  },
  {
    id: 'quantum',
    title: 'Quantum Circuit Visualizer',
    description: "Quantum circuit visualizer - because regular circuits weren't confusing enough",
    icon: Atom,
    tech: ['Quantum', 'Education'],
    component: QuantumDemo,
  },
  {
    id: 'astro',
    title: 'Exoplanet Habitability Calculator',
    description: "Exoplanet habitability calculator - because Earth is so last century",
    icon: Telescope,
    tech: ['Astrophysics', 'Physics'],
    component: AstroDemo,
  },
  {
    id: 'status',
    title: 'Live Status Dashboard',
    description: "Real-time metrics because I enjoy overengineering simple things",
    icon: Activity,
    tech: ['Cloud', 'Monitoring'],
    component: StatusDemo,
  },
];

const SkillsLabSection = () => {
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills-lab" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Skills Lab</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Don't take my word for it—try these live demos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-punk rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <demo.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono font-bold text-lg mb-1">{demo.title}</h3>
                    <p className="text-sm text-muted-foreground">{demo.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {demo.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setExpandedDemo(expandedDemo === demo.id ? null : demo.id)}
                  className="w-full py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
                >
                  {expandedDemo === demo.id ? 'Close Demo' : 'Try It →'}
                </button>
              </div>

              {expandedDemo === demo.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <demo.component />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsLabSection;
