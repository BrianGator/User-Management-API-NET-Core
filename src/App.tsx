/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { csharpFiles } from './csharp-code.ts';
import { Code2, CheckCircle2, Download, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<keyof typeof csharpFiles>('Program.cs');
  
  return (
    <div className="h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col md:flex-row border-0 md:border-8 border-[#1E293B] overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-white border-r-4 border-[#E2E8F0] flex flex-col hidden md:flex h-full sticky top-0 overflow-y-auto">
        <div className="p-6 border-b-4 border-[#334155] bg-[#1E293B] text-white">
          <div className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-1">Project Hub</div>
          <div className="flex items-center gap-2 mb-2 mt-2">
            <Terminal className="w-6 h-6 text-[#38BDF8]" />
            <h1 className="font-black text-xl tracking-tight uppercase">TechHive API</h1>
          </div>
          <p className="text-[#94A3B8] text-[10px] mt-1 leading-relaxed font-bold uppercase">
            ASP.NET Core User Management API Generation complete.
          </p>
        </div>
        
        <div className="p-6 flex-grow flex flex-col gap-6">
          <div>
            <h2 className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-3">Generated Files</h2>
            <nav className="space-y-2">
              {Object.keys(csharpFiles).map((filename) => (
                <button
                  key={filename}
                  onClick={() => setActiveTab(filename as keyof typeof csharpFiles)}
                  className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-tight transition-colors border-2 flex items-center group ${
                    activeTab === filename 
                      ? 'border-[#1E293B] bg-[#1E293B] text-white' 
                      : 'border-transparent text-[#64748B] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Code2 className={`w-4 h-4 ${activeTab === filename ? 'text-[#38BDF8]' : 'text-[#64748B] group-hover:text-[#1E293B]'}`} />
                    <span className="truncate">{filename}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-4 bg-[#F1F5F9] border-2 border-[#CBD5E1]">
            <h2 className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-3">Assignment Rubric</h2>
            <div className="space-y-3">
              <RubricItem title="CRUD Endpoints" desc="GET, POST, PUT, DELETE in UsersController" />
              <RubricItem title="Debugging & Validation" desc="Added [Required] and null checks" />
              <RubricItem title="Error Middleware" desc="Global Exception tracking in pipeline" />
              <RubricItem title="Auth Middleware" desc="Token validation pipeline step" />
              <RubricItem title="Logging Middleware" desc="Request timing & routing logs" />
            </div>
          </div>
          
          <div className="text-[10px] font-bold uppercase text-[#94A3B8] text-center tracking-widest pt-2">
            Written by Brian McCarthy
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 w-full p-4 md:p-8 overflow-hidden flex flex-col h-full">
        <header className="mb-8 shrink-0">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase text-[#0F172A]">Your Generated Backend Code</h2>
              <p className="text-[#64748B] font-medium mt-1 max-w-xl text-xs leading-relaxed">
                The assignment asked to use Copilot to generate, debug, and configure an ASP.NET Core Web API.
                The AI has written all the required C# files physically in the workspace for you.
              </p>
            </div>
            
            <div className="flex bg-white text-[#0F172A] p-4 border-4 border-[#1E293B] max-w-sm text-xs items-start gap-4 shadow-none">
              <div className="bg-[#38BDF8] border-2 border-[#1E293B] p-1.5 shrink-0 mt-0.5">
                <Download className="w-4 h-4 text-[#1E293B]" />
              </div>
              <div>
                <p className="font-bold mb-1 uppercase tracking-tight text-[10px] text-[#0F172A]">Export your Github Repo</p>
                <p className="leading-tight text-[#64748B] font-medium text-[11px]">The C# Web API project is ready. You can export this project to your GitHub repository.</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile File Nav */}
        <div className="md:hidden mb-4 shrink-0 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {Object.keys(csharpFiles).map((filename) => (
              <button
                key={filename}
                onClick={() => setActiveTab(filename as keyof typeof csharpFiles)}
                className={`whitespace-nowrap px-3 py-1.5 text-[11px] font-bold uppercase tracking-tight border-2 transition-colors ${
                  activeTab === filename 
                    ? 'border-[#1E293B] bg-[#1E293B] text-white' 
                    : 'border-[#E2E8F0] bg-white text-[#64748B]'
                }`}
              >
                {filename}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-[#1E293B] flex flex-col flex-grow min-h-0 relative">
          <div className="absolute -top-3 -left-3 bg-[#1E293B] text-white text-[10px] px-2 py-1 font-bold z-10 hidden md:block">SOURCE CODE</div>
          <div className="flex items-center px-4 py-3 bg-[#F8FAFC] border-b-4 border-[#1E293B]">
            <div className="mx-auto text-[11px] font-bold font-mono text-[#0F172A] uppercase flex items-center gap-2 tracking-widest">
              <Code2 className="w-4 h-4 text-[#38BDF8]" />
              {activeTab}
            </div>
          </div>
          <div className="overflow-auto p-4 md:p-6 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased' }}>
            <pre className="whitespace-pre-wrap"><code dangerouslySetInnerHTML={{ __html: syntaxHighlight(csharpFiles[activeTab]) }} /></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function RubricItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-3 items-start group">
      <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
      <div>
        <h4 className="text-[11px] font-bold text-[#0F172A] leading-tight uppercase">{title}</h4>
        <p className="text-[10px] text-[#64748B] mt-1 leading-tight font-medium">{desc}</p>
      </div>
    </div>
  );
}

function syntaxHighlight(code: string) {
  let html = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  const keywords = ['using', 'namespace', 'public', 'class', 'private', 'static', 'readonly', 'var', 'if', 'return', 'await', 'async', 'string', 'int', 'bool', 'void', 'try', 'catch', 'out'];
  const keywordRegex = new RegExp('\\\\b(' + keywords.join('|') + ')\\\\b', 'g');
  html = html.replace(keywordRegex, '<span style="color: #569cd6;">$1</span>');
  
  html = html.replace(new RegExp('\\\\b([A-Z][a-zA-Z0-9_]*)\\\\b', 'g'), '<span style="color: #4ec9b0;">$1</span>');
  html = html.replace(new RegExp('(".*?")', 'g'), '<span style="color: #ce9178;">$1</span>');
  html = html.replace(new RegExp('(\\\\[.*?\\\\])', 'g'), '<span style="color: #4fc1ff;">$1</span>');
  html = html.replace(new RegExp('(\\/\\/.*)', 'g'), '<span style="color: #6a9955;">$1</span>');

  return html;
}
