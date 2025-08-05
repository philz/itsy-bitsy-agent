"use strict";(()=>{function it(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ee=it();function Vt(t){ee=t}var ge={exec:()=>null};function b(t,e=""){let s=typeof t=="string"?t:t.source,i={replace:(n,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(M.caret,"$1"),s=s.replace(n,o),i},getRegex:()=>new RegExp(s,e)};return i}var M={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Un=/^(?:[ \t]*(?:\n|$))+/,Hn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Bn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,me=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Fn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rt=/(?:[*+-]|\d{1,9}[.)])/,Qt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jt=b(Qt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gn=b(Qt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ot=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qn=/^[^\n]+/,at=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Wn=b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",at).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jn=b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rt).getRegex(),Ne="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yn=b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",Ne).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),en=b(ot).replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Kn=b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",en).getRegex(),ct={blockquote:Kn,code:Hn,def:Wn,fences:Bn,heading:Fn,hr:me,html:Yn,lheading:Jt,list:jn,newline:Un,paragraph:en,table:ge,text:qn},jt=b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Zn={...ct,lheading:Gn,table:jt,paragraph:b(ot).replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",jt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex()},Xn={...ct,html:b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ge,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:b(ot).replace("hr",me).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vn=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tn=/^( {2,}|\\)\n(?!\s*$)/,Jn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$e=/[\p{P}\p{S}]/u,ut=/[\s\p{P}\p{S}]/u,nn=/[^\s\p{P}\p{S}]/u,es=b(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ut).getRegex(),sn=/(?!~)[\p{P}\p{S}]/u,ts=/(?!~)[\s\p{P}\p{S}]/u,ns=/(?:[^\s\p{P}\p{S}]|~)/u,ss=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,rn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,is=b(rn,"u").replace(/punct/g,$e).getRegex(),rs=b(rn,"u").replace(/punct/g,sn).getRegex(),on="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",os=b(on,"gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,ut).replace(/punct/g,$e).getRegex(),as=b(on,"gu").replace(/notPunctSpace/g,ns).replace(/punctSpace/g,ts).replace(/punct/g,sn).getRegex(),ls=b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,ut).replace(/punct/g,$e).getRegex(),cs=b(/\\(punct)/,"gu").replace(/punct/g,$e).getRegex(),us=b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ps=b(lt).replace("(?:-->|$)","-->").getRegex(),hs=b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ps).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Oe=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,ds=b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Oe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),an=b(/^!?\[(label)\]\[(ref)\]/).replace("label",Oe).replace("ref",at).getRegex(),ln=b(/^!?\[(ref)\](?:\[\])?/).replace("ref",at).getRegex(),fs=b("reflink|nolink(?!\\()","g").replace("reflink",an).replace("nolink",ln).getRegex(),pt={_backpedal:ge,anyPunctuation:cs,autolink:us,blockSkip:ss,br:tn,code:Qn,del:ge,emStrongLDelim:is,emStrongRDelimAst:os,emStrongRDelimUnd:ls,escape:Vn,link:ds,nolink:ln,punctuation:es,reflink:an,reflinkSearch:fs,tag:hs,text:Jn,url:ge},gs={...pt,link:b(/^!?\[(label)\]\((.*?)\)/).replace("label",Oe).getRegex(),reflink:b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Oe).getRegex()},tt={...pt,emStrongRDelimAst:as,emStrongLDelim:rs,url:b(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},ms={...tt,br:b(tn).replace("{2,}","*").getRegex(),text:b(tt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ce={normal:ct,gfm:Zn,pedantic:Xn},de={normal:pt,gfm:tt,breaks:ms,pedantic:gs},ks={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yt=t=>ks[t];function B(t,e){if(e){if(M.escapeTest.test(t))return t.replace(M.escapeReplace,Yt)}else if(M.escapeTestNoEncode.test(t))return t.replace(M.escapeReplaceNoEncode,Yt);return t}function Kt(t){try{t=encodeURI(t).replace(M.percentDecode,"%")}catch{return null}return t}function Zt(t,e){let s=t.replace(M.findPipe,(a,o,l)=>{let c=!1,p=o;for(;--p>=0&&l[p]==="\\";)c=!c;return c?"|":" |"}),i=s.split(M.splitPipe),n=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;n<i.length;n++)i[n]=i[n].trim().replace(M.slashPipe,"|");return i}function fe(t,e,s){let i=t.length;if(i===0)return"";let n=0;for(;n<i;){let a=t.charAt(i-n-1);if(a===e&&!s)n++;else if(a!==e&&s)n++;else break}return t.slice(0,i-n)}function xs(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])s++;else if(t[i]===e[1]&&(s--,s<0))return i;return s>0?-2:-1}function Xt(t,e,s,i,n){let a=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");i.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:s,href:a,title:o,text:l,tokens:i.inlineTokens(l)};return i.state.inLink=!1,c}function bs(t,e,s){let i=t.match(s.other.indentCodeCompensation);if(i===null)return e;let n=i[1];return e.split(`
`).map(a=>{let o=a.match(s.other.beginningSpace);if(o===null)return a;let[l]=o;return l.length>=n.length?a.slice(n.length):a}).join(`
`)}var Pe=class{options;rules;lexer;constructor(t){this.options=t||ee}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?s:fe(s,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],i=bs(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let i=fe(s,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(s=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:fe(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=fe(e[0],`
`).split(`
`),i="",n="",a=[];for(;s.length>0;){let o=!1,l=[],c;for(c=0;c<s.length;c++)if(this.rules.other.blockquoteStart.test(s[c]))l.push(s[c]),o=!0;else if(!o)l.push(s[c]);else break;s=s.slice(c);let p=l.join(`
`),g=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${p}`:p,n=n?`${n}
${g}`:g;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,a,!0),this.lexer.state.top=m,s.length===0)break;let k=a.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let w=k,_=w.raw+`
`+s.join(`
`),N=this.blockquote(_);a[a.length-1]=N,i=i.substring(0,i.length-w.raw.length)+N.raw,n=n.substring(0,n.length-w.text.length)+N.text;break}else if(k?.type==="list"){let w=k,_=w.raw+`
`+s.join(`
`),N=this.list(_);a[a.length-1]=N,i=i.substring(0,i.length-k.raw.length)+N.raw,n=n.substring(0,n.length-w.raw.length)+N.raw,s=_.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),i=s.length>1,n={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");let a=this.rules.other.listItemRegex(s),o=!1;for(;t;){let c=!1,p="",g="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;p=e[0],t=t.substring(p.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,le=>" ".repeat(3*le.length)),k=t.split(`
`,1)[0],w=!m.trim(),_=0;if(this.options.pedantic?(_=2,g=m.trimStart()):w?_=e[1].length+1:(_=e[2].search(this.rules.other.nonSpaceChar),_=_>4?1:_,g=m.slice(_),_+=e[1].length),w&&this.rules.other.blankLine.test(k)&&(p+=k+`
`,t=t.substring(k.length+1),c=!0),!c){let le=this.rules.other.nextBulletRegex(_),we=this.rules.other.hrRegex(_),K=this.rules.other.fencesBeginRegex(_),A=this.rules.other.headingBeginRegex(_),Z=this.rules.other.htmlBeginRegex(_);for(;t;){let X=t.split(`
`,1)[0],V;if(k=X,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),V=k):V=k.replace(this.rules.other.tabCharGlobal,"    "),K.test(k)||A.test(k)||Z.test(k)||le.test(k)||we.test(k))break;if(V.search(this.rules.other.nonSpaceChar)>=_||!k.trim())g+=`
`+V.slice(_);else{if(w||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(m)||A.test(m)||we.test(m))break;g+=`
`+k}!w&&!k.trim()&&(w=!0),p+=X+`
`,t=t.substring(X.length+1),m=V.slice(_)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(o=!0));let N=null,Te;this.options.gfm&&(N=this.rules.other.listIsTask.exec(g),N&&(Te=N[0]!=="[ ] ",g=g.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:p,task:!!N,checked:Te,loose:!1,text:g,tokens:[]}),n.raw+=p}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c=0;c<n.items.length;c++)if(this.lexer.state.top=!1,n.items[c].tokens=this.lexer.blockTokens(n.items[c].text,[]),!n.loose){let p=n.items[c].tokens.filter(m=>m.type==="space"),g=p.length>0&&p.some(m=>this.rules.other.anyLine.test(m.raw));n.loose=g}if(n.loose)for(let c=0;c<n.items.length;c++)n.items[c].loose=!0;return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:e[0],href:i,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=Zt(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(s.length===i.length){for(let o of i)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<s.length;o++)a.header.push({text:s[o],tokens:this.lexer.inline(s[o]),header:!0,align:a.align[o]});for(let o of n)a.rows.push(Zt(o,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let a=fe(s.slice(0,-1),"\\");if((s.length-a.length)%2===0)return}else{let a=xs(e[2],"()");if(a===-2)return;if(a>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let i=e[2],n="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],n=a[3])}else n=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?i=i.slice(1):i=i.slice(1,-1)),Xt(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let i=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[i.toLowerCase()];if(!n){let a=s[0].charAt(0);return{type:"text",raw:a,text:a}}return Xt(s,n,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||i[3]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!s||this.rules.inline.punctuation.exec(s))){let n=[...i[0]].length-1,a,o,l=n,c=0,p=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*t.length+n);(i=p.exec(e))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(o=[...a].length,i[3]||i[4]){l+=o;continue}else if((i[5]||i[6])&&n%3&&!((n+o)%3)){c+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+c);let g=[...i[0]][0].length,m=t.slice(0,n+i.index+g+o);if(Math.min(n,o)%2){let w=m.slice(1,-1);return{type:"em",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}let k=m.slice(2,-2);return{type:"strong",raw:m,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(s),n=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return i&&n&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,i;return e[2]==="@"?(s=e[1],i="mailto:"+s):(s=e[1],i=s),{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,i;if(e[2]==="@")s=e[0],i="mailto:"+s;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);s=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},W=class nt{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ee,this.options.tokenizer=this.options.tokenizer||new Pe,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let s={other:M,block:Ce.normal,inline:de.normal};this.options.pedantic?(s.block=Ce.pedantic,s.inline=de.pedantic):this.options.gfm&&(s.block=Ce.gfm,this.options.breaks?s.inline=de.breaks:s.inline=de.gfm),this.tokenizer.rules=s}static get rules(){return{block:Ce,inline:de}}static lex(e,s){return new nt(s).lex(e)}static lexInline(e,s){return new nt(s).inlineTokens(e)}lex(e){e=e.replace(M.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let i=this.inlineQueue[s];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],i=!1){for(this.options.pedantic&&(e=e.replace(M.tabCharGlobal,"    ").replace(M.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,s))?(e=e.substring(n.raw.length),s.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=s.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:s.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=s.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):s.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=s.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),s.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),s.push(n);continue}let a=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(p=>{c=p.call({lexer:this},l),typeof c=="number"&&c>=0&&(o=Math.min(o,c))}),o<1/0&&o>=0&&(a=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){let o=s.at(-1);i&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):s.push(n),i=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=s.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):s.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}inlineTokens(e,s=[]){let i=e,n=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,n.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(n=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;e;){a||(o=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},e,s))?(e=e.substring(l.raw.length),s.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let p=s.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(l=this.tokenizer.emStrong(e,i,o)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),s.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),s.push(l);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,g=e.slice(1),m;this.options.extensions.startInline.forEach(k=>{m=k.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;let p=s.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return s}},De=class{options;parser;constructor(t){this.options=t||ee}space(t){return""}code({text:t,lang:e,escaped:s}){let i=(e||"").match(M.notSpaceStart)?.[0],n=t.replace(M.endingNewline,"")+`
`;return i?'<pre><code class="language-'+B(i)+'">'+(s?n:B(n,!0))+`</code></pre>
`:"<pre><code>"+(s?n:B(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,i="";for(let o=0;o<t.items.length;o++){let l=t.items[o];i+=this.listitem(l)}let n=e?"ol":"ul",a=e&&s!==1?' start="'+s+'"':"";return"<"+n+a+`>
`+i+"</"+n+`>
`}listitem(t){let e="";if(t.task){let s=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=s+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=s+" "+B(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):e+=s+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",s="";for(let n=0;n<t.header.length;n++)s+=this.tablecell(t.header[n]);e+=this.tablerow({text:s});let i="";for(let n=0;n<t.rows.length;n++){let a=t.rows[n];s="";for(let o=0;o<a.length;o++)s+=this.tablecell(a[o]);i+=this.tablerow({text:s})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),s=t.header?"th":"td";return(t.align?`<${s} align="${t.align}">`:`<${s}>`)+e+`</${s}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${B(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let i=this.parser.parseInline(s),n=Kt(t);if(n===null)return i;t=n;let a='<a href="'+t+'"';return e&&(a+=' title="'+B(e)+'"'),a+=">"+i+"</a>",a}image({href:t,title:e,text:s,tokens:i}){i&&(s=this.parser.parseInline(i,this.parser.textRenderer));let n=Kt(t);if(n===null)return B(s);t=n;let a=`<img src="${t}" alt="${s}"`;return e&&(a+=` title="${B(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:B(t.text)}},ht=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},j=class st{options;renderer;textRenderer;constructor(e){this.options=e||ee,this.options.renderer=this.options.renderer||new De,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ht}static parse(e,s){return new st(s).parse(e)}static parseInline(e,s){return new st(s).parseInline(e)}parse(e,s=!0){let i="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=a,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){i+=c||"";continue}}let o=a;switch(o.type){case"space":{i+=this.renderer.space(o);continue}case"hr":{i+=this.renderer.hr(o);continue}case"heading":{i+=this.renderer.heading(o);continue}case"code":{i+=this.renderer.code(o);continue}case"table":{i+=this.renderer.table(o);continue}case"blockquote":{i+=this.renderer.blockquote(o);continue}case"list":{i+=this.renderer.list(o);continue}case"html":{i+=this.renderer.html(o);continue}case"paragraph":{i+=this.renderer.paragraph(o);continue}case"text":{let l=o,c=this.renderer.text(l);for(;n+1<e.length&&e[n+1].type==="text";)l=e[++n],c+=`
`+this.renderer.text(l);s?i+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):i+=c;continue}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}parseInline(e,s=this.renderer){let i="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=l||"";continue}}let o=a;switch(o.type){case"escape":{i+=s.text(o);break}case"html":{i+=s.html(o);break}case"link":{i+=s.link(o);break}case"image":{i+=s.image(o);break}case"strong":{i+=s.strong(o);break}case"em":{i+=s.em(o);break}case"codespan":{i+=s.codespan(o);break}case"br":{i+=s.br(o);break}case"del":{i+=s.del(o);break}case"text":{i+=s.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}},Me=class{options;block;constructor(t){this.options=t||ee}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?W.lex:W.lexInline}provideParser(){return this.block?j.parse:j.parseInline}},_s=class{defaults=it();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=j;Renderer=De;TextRenderer=ht;Lexer=W;Tokenizer=Pe;Hooks=Me;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let i of t)switch(s=s.concat(e.call(this,i)),i.type){case"table":{let n=i;for(let a of n.header)s=s.concat(this.walkTokens(a.tokens,e));for(let a of n.rows)for(let o of a)s=s.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=i;s=s.concat(this.walkTokens(n.items,e));break}default:{let n=i;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(a=>{let o=n[a].flat(1/0);s=s.concat(this.walkTokens(o,e))}):n.tokens&&(s=s.concat(this.walkTokens(n.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let a=e.renderers[n.name];a?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=a.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[n.level];a?a.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),i.extensions=e),s.renderer){let n=this.defaults.renderer||new De(this.defaults);for(let a in s.renderer){if(!(a in n))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let o=a,l=s.renderer[o],c=n[o];n[o]=(...p)=>{let g=l.apply(n,p);return g===!1&&(g=c.apply(n,p)),g||""}}i.renderer=n}if(s.tokenizer){let n=this.defaults.tokenizer||new Pe(this.defaults);for(let a in s.tokenizer){if(!(a in n))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let o=a,l=s.tokenizer[o],c=n[o];n[o]=(...p)=>{let g=l.apply(n,p);return g===!1&&(g=c.apply(n,p)),g}}i.tokenizer=n}if(s.hooks){let n=this.defaults.hooks||new Me;for(let a in s.hooks){if(!(a in n))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let o=a,l=s.hooks[o],c=n[o];Me.passThroughHooks.has(a)?n[o]=p=>{if(this.defaults.async)return Promise.resolve(l.call(n,p)).then(m=>c.call(n,m));let g=l.call(n,p);return c.call(n,g)}:n[o]=(...p)=>{let g=l.apply(n,p);return g===!1&&(g=c.apply(n,p)),g}}i.hooks=n}if(s.walkTokens){let n=this.defaults.walkTokens,a=s.walkTokens;i.walkTokens=function(o){let l=[];return l.push(a.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return W.lex(t,e??this.defaults)}parser(t,e){return j.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let i={...s},n={...this.defaults,...i},a=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));n.hooks&&(n.hooks.options=n,n.hooks.block=t);let o=n.hooks?n.hooks.provideLexer():t?W.lex:W.lexInline,l=n.hooks?n.hooks.provideParser():t?j.parse:j.parseInline;if(n.async)return Promise.resolve(n.hooks?n.hooks.preprocess(e):e).then(c=>o(c,n)).then(c=>n.hooks?n.hooks.processAllTokens(c):c).then(c=>n.walkTokens?Promise.all(this.walkTokens(c,n.walkTokens)).then(()=>c):c).then(c=>l(c,n)).then(c=>n.hooks?n.hooks.postprocess(c):c).catch(a);try{n.hooks&&(e=n.hooks.preprocess(e));let c=o(e,n);n.hooks&&(c=n.hooks.processAllTokens(c)),n.walkTokens&&this.walkTokens(c,n.walkTokens);let p=l(c,n);return n.hooks&&(p=n.hooks.postprocess(p)),p}catch(c){return a(c)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+B(s.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(s);throw s}}},J=new _s;function x(t,e){return J.parse(t,e)}x.options=x.setOptions=function(t){return J.setOptions(t),x.defaults=J.defaults,Vt(x.defaults),x};x.getDefaults=it;x.defaults=ee;x.use=function(...t){return J.use(...t),x.defaults=J.defaults,Vt(x.defaults),x};x.walkTokens=function(t,e){return J.walkTokens(t,e)};x.parseInline=J.parseInline;x.Parser=j;x.parser=j.parse;x.Renderer=De;x.TextRenderer=ht;x.Lexer=W;x.lexer=W.lex;x.Tokenizer=Pe;x.Hooks=Me;x.parse=x;var Fs=x.options,Gs=x.setOptions,qs=x.use,Ws=x.walkTokens,js=x.parseInline;var Ys=j.parse,Ks=W.lex;var{entries:xn,setPrototypeOf:cn,isFrozen:ys,getPrototypeOf:Ts,getOwnPropertyDescriptor:ws}=Object,{freeze:P,seal:z,create:bn}=Object,{apply:xt,construct:bt}=typeof Reflect<"u"&&Reflect;P||(P=function(e){return e});z||(z=function(e){return e});xt||(xt=function(e,s,i){return e.apply(s,i)});bt||(bt=function(e,s){return new e(...s)});var ze=D(Array.prototype.forEach),Es=D(Array.prototype.lastIndexOf),un=D(Array.prototype.pop),ke=D(Array.prototype.push),As=D(Array.prototype.splice),He=D(String.prototype.toLowerCase),dt=D(String.prototype.toString),pn=D(String.prototype.match),xe=D(String.prototype.replace),Ss=D(String.prototype.indexOf),vs=D(String.prototype.trim),U=D(Object.prototype.hasOwnProperty),O=D(RegExp.prototype.test),be=Rs(TypeError);function D(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var s=arguments.length,i=new Array(s>1?s-1:0),n=1;n<s;n++)i[n-1]=arguments[n];return xt(t,e,i)}}function Rs(t){return function(){for(var e=arguments.length,s=new Array(e),i=0;i<e;i++)s[i]=arguments[i];return bt(t,s)}}function f(t,e){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:He;cn&&cn(t,null);let i=e.length;for(;i--;){let n=e[i];if(typeof n=="string"){let a=s(n);a!==n&&(ys(e)||(e[i]=a),n=a)}t[n]=!0}return t}function Ls(t){for(let e=0;e<t.length;e++)U(t,e)||(t[e]=null);return t}function Y(t){let e=bn(null);for(let[s,i]of xn(t))U(t,s)&&(Array.isArray(i)?e[s]=Ls(i):i&&typeof i=="object"&&i.constructor===Object?e[s]=Y(i):e[s]=i);return e}function _e(t,e){for(;t!==null;){let i=ws(t,e);if(i){if(i.get)return D(i.get);if(typeof i.value=="function")return D(i.value)}t=Ts(t)}function s(){return null}return s}var hn=P(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ft=P(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gt=P(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Is=P(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mt=P(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Cs=P(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),dn=P(["#text"]),fn=P(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),kt=P(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gn=P(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ue=P(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ms=z(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Os=z(/<%[\w\W]*|[\w\W]*%>/gm),Ps=z(/\$\{[\w\W]*/gm),Ds=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ns=z(/^aria-[\-\w]+$/),_n=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$s=z(/^(?:\w+script|data):/i),zs=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yn=z(/^html$/i),Us=z(/^[a-z][.\w]*(-[.\w]+)+$/i),mn=Object.freeze({__proto__:null,ARIA_ATTR:Ns,ATTR_WHITESPACE:zs,CUSTOM_ELEMENT:Us,DATA_ATTR:Ds,DOCTYPE_NAME:yn,ERB_EXPR:Os,IS_ALLOWED_URI:_n,IS_SCRIPT_OR_DATA:$s,MUSTACHE_EXPR:Ms,TMPLIT_EXPR:Ps}),ye={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Hs=function(){return typeof window>"u"?null:window},Bs=function(e,s){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null,n="data-tt-policy-suffix";s&&s.hasAttribute(n)&&(i=s.getAttribute(n));let a="dompurify"+(i?"#"+i:"");try{return e.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},kn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Tn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hs(),e=d=>Tn(d);if(e.version="3.2.6",e.removed=[],!t||!t.document||t.document.nodeType!==ye.document||!t.Element)return e.isSupported=!1,e;let{document:s}=t,i=s,n=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:l,Element:c,NodeFilter:p,NamedNodeMap:g=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:k,trustedTypes:w}=t,_=c.prototype,N=_e(_,"cloneNode"),Te=_e(_,"remove"),le=_e(_,"nextSibling"),we=_e(_,"childNodes"),K=_e(_,"parentNode");if(typeof o=="function"){let d=s.createElement("template");d.content&&d.content.ownerDocument&&(s=d.content.ownerDocument)}let A,Z="",{implementation:X,createNodeIterator:V,createDocumentFragment:En,getElementsByTagName:An}=s,{importNode:Sn}=i,C=kn();e.isSupported=typeof xn=="function"&&typeof K=="function"&&X&&X.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Be,ERB_EXPR:Fe,TMPLIT_EXPR:Ge,DATA_ATTR:vn,ARIA_ATTR:Rn,IS_SCRIPT_OR_DATA:Ln,ATTR_WHITESPACE:yt,CUSTOM_ELEMENT:In}=mn,{IS_ALLOWED_URI:Tt}=mn,S=null,wt=f({},[...hn,...ft,...gt,...mt,...dn]),R=null,Et=f({},[...fn,...kt,...gn,...Ue]),T=Object.seal(bn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ce=null,qe=null,At=!0,We=!0,St=!1,vt=!0,te=!1,Ee=!0,Q=!1,je=!1,Ye=!1,ne=!1,Ae=!1,Se=!1,Rt=!0,Lt=!1,Cn="user-content-",Ke=!0,ue=!1,se={},ie=null,It=f({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ct=null,Mt=f({},["audio","video","img","source","image","track"]),Ze=null,Ot=f({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ve="http://www.w3.org/1998/Math/MathML",Re="http://www.w3.org/2000/svg",F="http://www.w3.org/1999/xhtml",re=F,Xe=!1,Ve=null,Mn=f({},[ve,Re,F],dt),Le=f({},["mi","mo","mn","ms","mtext"]),Ie=f({},["annotation-xml"]),On=f({},["title","style","font","a","script"]),pe=null,Pn=["application/xhtml+xml","text/html"],Dn="text/html",v=null,oe=null,Nn=s.createElement("form"),Pt=function(r){return r instanceof RegExp||r instanceof Function},Qe=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(oe&&oe===r)){if((!r||typeof r!="object")&&(r={}),r=Y(r),pe=Pn.indexOf(r.PARSER_MEDIA_TYPE)===-1?Dn:r.PARSER_MEDIA_TYPE,v=pe==="application/xhtml+xml"?dt:He,S=U(r,"ALLOWED_TAGS")?f({},r.ALLOWED_TAGS,v):wt,R=U(r,"ALLOWED_ATTR")?f({},r.ALLOWED_ATTR,v):Et,Ve=U(r,"ALLOWED_NAMESPACES")?f({},r.ALLOWED_NAMESPACES,dt):Mn,Ze=U(r,"ADD_URI_SAFE_ATTR")?f(Y(Ot),r.ADD_URI_SAFE_ATTR,v):Ot,Ct=U(r,"ADD_DATA_URI_TAGS")?f(Y(Mt),r.ADD_DATA_URI_TAGS,v):Mt,ie=U(r,"FORBID_CONTENTS")?f({},r.FORBID_CONTENTS,v):It,ce=U(r,"FORBID_TAGS")?f({},r.FORBID_TAGS,v):Y({}),qe=U(r,"FORBID_ATTR")?f({},r.FORBID_ATTR,v):Y({}),se=U(r,"USE_PROFILES")?r.USE_PROFILES:!1,At=r.ALLOW_ARIA_ATTR!==!1,We=r.ALLOW_DATA_ATTR!==!1,St=r.ALLOW_UNKNOWN_PROTOCOLS||!1,vt=r.ALLOW_SELF_CLOSE_IN_ATTR!==!1,te=r.SAFE_FOR_TEMPLATES||!1,Ee=r.SAFE_FOR_XML!==!1,Q=r.WHOLE_DOCUMENT||!1,ne=r.RETURN_DOM||!1,Ae=r.RETURN_DOM_FRAGMENT||!1,Se=r.RETURN_TRUSTED_TYPE||!1,Ye=r.FORCE_BODY||!1,Rt=r.SANITIZE_DOM!==!1,Lt=r.SANITIZE_NAMED_PROPS||!1,Ke=r.KEEP_CONTENT!==!1,ue=r.IN_PLACE||!1,Tt=r.ALLOWED_URI_REGEXP||_n,re=r.NAMESPACE||F,Le=r.MATHML_TEXT_INTEGRATION_POINTS||Le,Ie=r.HTML_INTEGRATION_POINTS||Ie,T=r.CUSTOM_ELEMENT_HANDLING||{},r.CUSTOM_ELEMENT_HANDLING&&Pt(r.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(T.tagNameCheck=r.CUSTOM_ELEMENT_HANDLING.tagNameCheck),r.CUSTOM_ELEMENT_HANDLING&&Pt(r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(T.attributeNameCheck=r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),r.CUSTOM_ELEMENT_HANDLING&&typeof r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),te&&(We=!1),Ae&&(ne=!0),se&&(S=f({},dn),R=[],se.html===!0&&(f(S,hn),f(R,fn)),se.svg===!0&&(f(S,ft),f(R,kt),f(R,Ue)),se.svgFilters===!0&&(f(S,gt),f(R,kt),f(R,Ue)),se.mathMl===!0&&(f(S,mt),f(R,gn),f(R,Ue))),r.ADD_TAGS&&(S===wt&&(S=Y(S)),f(S,r.ADD_TAGS,v)),r.ADD_ATTR&&(R===Et&&(R=Y(R)),f(R,r.ADD_ATTR,v)),r.ADD_URI_SAFE_ATTR&&f(Ze,r.ADD_URI_SAFE_ATTR,v),r.FORBID_CONTENTS&&(ie===It&&(ie=Y(ie)),f(ie,r.FORBID_CONTENTS,v)),Ke&&(S["#text"]=!0),Q&&f(S,["html","head","body"]),S.table&&(f(S,["tbody"]),delete ce.tbody),r.TRUSTED_TYPES_POLICY){if(typeof r.TRUSTED_TYPES_POLICY.createHTML!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof r.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=r.TRUSTED_TYPES_POLICY,Z=A.createHTML("")}else A===void 0&&(A=Bs(w,n)),A!==null&&typeof Z=="string"&&(Z=A.createHTML(""));P&&P(r),oe=r}},Dt=f({},[...ft,...gt,...Is]),Nt=f({},[...mt,...Cs]),$n=function(r){let u=K(r);(!u||!u.tagName)&&(u={namespaceURI:re,tagName:"template"});let h=He(r.tagName),y=He(u.tagName);return Ve[r.namespaceURI]?r.namespaceURI===Re?u.namespaceURI===F?h==="svg":u.namespaceURI===ve?h==="svg"&&(y==="annotation-xml"||Le[y]):!!Dt[h]:r.namespaceURI===ve?u.namespaceURI===F?h==="math":u.namespaceURI===Re?h==="math"&&Ie[y]:!!Nt[h]:r.namespaceURI===F?u.namespaceURI===Re&&!Ie[y]||u.namespaceURI===ve&&!Le[y]?!1:!Nt[h]&&(On[h]||!Dt[h]):!!(pe==="application/xhtml+xml"&&Ve[r.namespaceURI]):!1},H=function(r){ke(e.removed,{element:r});try{K(r).removeChild(r)}catch{Te(r)}},ae=function(r,u){try{ke(e.removed,{attribute:u.getAttributeNode(r),from:u})}catch{ke(e.removed,{attribute:null,from:u})}if(u.removeAttribute(r),r==="is")if(ne||Ae)try{H(u)}catch{}else try{u.setAttribute(r,"")}catch{}},$t=function(r){let u=null,h=null;if(Ye)r="<remove></remove>"+r;else{let E=pn(r,/^[\r\n\t ]+/);h=E&&E[0]}pe==="application/xhtml+xml"&&re===F&&(r='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+r+"</body></html>");let y=A?A.createHTML(r):r;if(re===F)try{u=new k().parseFromString(y,pe)}catch{}if(!u||!u.documentElement){u=X.createDocument(re,"template",null);try{u.documentElement.innerHTML=Xe?Z:y}catch{}}let L=u.body||u.documentElement;return r&&h&&L.insertBefore(s.createTextNode(h),L.childNodes[0]||null),re===F?An.call(u,Q?"html":"body")[0]:Q?u.documentElement:L},zt=function(r){return V.call(r.ownerDocument||r,r,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT|p.SHOW_PROCESSING_INSTRUCTION|p.SHOW_CDATA_SECTION,null)},Je=function(r){return r instanceof m&&(typeof r.nodeName!="string"||typeof r.textContent!="string"||typeof r.removeChild!="function"||!(r.attributes instanceof g)||typeof r.removeAttribute!="function"||typeof r.setAttribute!="function"||typeof r.namespaceURI!="string"||typeof r.insertBefore!="function"||typeof r.hasChildNodes!="function")},Ut=function(r){return typeof l=="function"&&r instanceof l};function G(d,r,u){ze(d,h=>{h.call(e,r,u,oe)})}let Ht=function(r){let u=null;if(G(C.beforeSanitizeElements,r,null),Je(r))return H(r),!0;let h=v(r.nodeName);if(G(C.uponSanitizeElement,r,{tagName:h,allowedTags:S}),Ee&&r.hasChildNodes()&&!Ut(r.firstElementChild)&&O(/<[/\w!]/g,r.innerHTML)&&O(/<[/\w!]/g,r.textContent)||r.nodeType===ye.progressingInstruction||Ee&&r.nodeType===ye.comment&&O(/<[/\w]/g,r.data))return H(r),!0;if(!S[h]||ce[h]){if(!ce[h]&&Ft(h)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h)))return!1;if(Ke&&!ie[h]){let y=K(r)||r.parentNode,L=we(r)||r.childNodes;if(L&&y){let E=L.length;for(let $=E-1;$>=0;--$){let q=N(L[$],!0);q.__removalCount=(r.__removalCount||0)+1,y.insertBefore(q,le(r))}}}return H(r),!0}return r instanceof c&&!$n(r)||(h==="noscript"||h==="noembed"||h==="noframes")&&O(/<\/no(script|embed|frames)/i,r.innerHTML)?(H(r),!0):(te&&r.nodeType===ye.text&&(u=r.textContent,ze([Be,Fe,Ge],y=>{u=xe(u,y," ")}),r.textContent!==u&&(ke(e.removed,{element:r.cloneNode()}),r.textContent=u)),G(C.afterSanitizeElements,r,null),!1)},Bt=function(r,u,h){if(Rt&&(u==="id"||u==="name")&&(h in s||h in Nn))return!1;if(!(We&&!qe[u]&&O(vn,u))){if(!(At&&O(Rn,u))){if(!R[u]||qe[u]){if(!(Ft(r)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,r)||T.tagNameCheck instanceof Function&&T.tagNameCheck(r))&&(T.attributeNameCheck instanceof RegExp&&O(T.attributeNameCheck,u)||T.attributeNameCheck instanceof Function&&T.attributeNameCheck(u))||u==="is"&&T.allowCustomizedBuiltInElements&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h))))return!1}else if(!Ze[u]){if(!O(Tt,xe(h,yt,""))){if(!((u==="src"||u==="xlink:href"||u==="href")&&r!=="script"&&Ss(h,"data:")===0&&Ct[r])){if(!(St&&!O(Ln,xe(h,yt,"")))){if(h)return!1}}}}}}return!0},Ft=function(r){return r!=="annotation-xml"&&pn(r,In)},Gt=function(r){G(C.beforeSanitizeAttributes,r,null);let{attributes:u}=r;if(!u||Je(r))return;let h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:R,forceKeepAttr:void 0},y=u.length;for(;y--;){let L=u[y],{name:E,namespaceURI:$,value:q}=L,he=v(E),et=q,I=E==="value"?et:vs(et);if(h.attrName=he,h.attrValue=I,h.keepAttr=!0,h.forceKeepAttr=void 0,G(C.uponSanitizeAttribute,r,h),I=h.attrValue,Lt&&(he==="id"||he==="name")&&(ae(E,r),I=Cn+I),Ee&&O(/((--!?|])>)|<\/(style|title)/i,I)){ae(E,r);continue}if(h.forceKeepAttr)continue;if(!h.keepAttr){ae(E,r);continue}if(!vt&&O(/\/>/i,I)){ae(E,r);continue}te&&ze([Be,Fe,Ge],Wt=>{I=xe(I,Wt," ")});let qt=v(r.nodeName);if(!Bt(qt,he,I)){ae(E,r);continue}if(A&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!$)switch(w.getAttributeType(qt,he)){case"TrustedHTML":{I=A.createHTML(I);break}case"TrustedScriptURL":{I=A.createScriptURL(I);break}}if(I!==et)try{$?r.setAttributeNS($,E,I):r.setAttribute(E,I),Je(r)?H(r):un(e.removed)}catch{ae(E,r)}}G(C.afterSanitizeAttributes,r,null)},zn=function d(r){let u=null,h=zt(r);for(G(C.beforeSanitizeShadowDOM,r,null);u=h.nextNode();)G(C.uponSanitizeShadowNode,u,null),Ht(u),Gt(u),u.content instanceof a&&d(u.content);G(C.afterSanitizeShadowDOM,r,null)};return e.sanitize=function(d){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},u=null,h=null,y=null,L=null;if(Xe=!d,Xe&&(d="<!-->"),typeof d!="string"&&!Ut(d))if(typeof d.toString=="function"){if(d=d.toString(),typeof d!="string")throw be("dirty is not a string, aborting")}else throw be("toString is not a function");if(!e.isSupported)return d;if(je||Qe(r),e.removed=[],typeof d=="string"&&(ue=!1),ue){if(d.nodeName){let q=v(d.nodeName);if(!S[q]||ce[q])throw be("root node is forbidden and cannot be sanitized in-place")}}else if(d instanceof l)u=$t("<!---->"),h=u.ownerDocument.importNode(d,!0),h.nodeType===ye.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?u=h:u.appendChild(h);else{if(!ne&&!te&&!Q&&d.indexOf("<")===-1)return A&&Se?A.createHTML(d):d;if(u=$t(d),!u)return ne?null:Se?Z:""}u&&Ye&&H(u.firstChild);let E=zt(ue?d:u);for(;y=E.nextNode();)Ht(y),Gt(y),y.content instanceof a&&zn(y.content);if(ue)return d;if(ne){if(Ae)for(L=En.call(u.ownerDocument);u.firstChild;)L.appendChild(u.firstChild);else L=u;return(R.shadowroot||R.shadowrootmode)&&(L=Sn.call(i,L,!0)),L}let $=Q?u.outerHTML:u.innerHTML;return Q&&S["!doctype"]&&u.ownerDocument&&u.ownerDocument.doctype&&u.ownerDocument.doctype.name&&O(yn,u.ownerDocument.doctype.name)&&($="<!DOCTYPE "+u.ownerDocument.doctype.name+`>
`+$),te&&ze([Be,Fe,Ge],q=>{$=xe($,q," ")}),A&&Se?A.createHTML($):$},e.setConfig=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Qe(d),je=!0},e.clearConfig=function(){oe=null,je=!1},e.isValidAttribute=function(d,r,u){oe||Qe({});let h=v(d),y=v(r);return Bt(h,y,u)},e.addHook=function(d,r){typeof r=="function"&&ke(C[d],r)},e.removeHook=function(d,r){if(r!==void 0){let u=Es(C[d],r);return u===-1?void 0:As(C[d],u,1)[0]}return un(C[d])},e.removeHooks=function(d){C[d]=[]},e.removeAllHooks=function(){C=kn()},e}var wn=Tn();var _t=class{constructor(t){this.isVisible=!1;this.conversation=[];this.container=null;this.hasEmbeddedApiKey=!1;this._eval_results=[];this.totalTokenUsage={input_tokens:0,output_tokens:0,cache_creation_input_tokens:0,cache_read_input_tokens:0};this.modelPricing={"claude-sonnet-4-20250514":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-sonnet-20241022":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-haiku-20241022":{input:.8,output:4,cache_write:1,cache_read:.08},"claude-opus-4-20250514":{input:15,output:75,cache_write:18.75,cache_read:1.5}};t?(this.apiKey=t,this.hasEmbeddedApiKey=!0):(this.apiKey=localStorage.getItem("bookmarklet-agent-api-key")||"",this.hasEmbeddedApiKey=!1),this.selectedModel=localStorage.getItem("bookmarklet-agent-model")||"claude-sonnet-4-20250514"}init(){this.createUI(),this.show()}renderMarkdown(t){try{let e=x.parse(t);return wn.sanitize(e)}catch(e){return console.warn("Markdown rendering failed:",e),t.replace(/\n/g,"<br>")}}createUI(){this.container||(this.container=document.createElement("div"),this.container.id="bookmarklet-agent",this.container.innerHTML=`
      <div class="agent-header">
        <h3>Itsy Bitsy Agent</h3>
        <div class="token-usage" id="token-usage" style="font-size: 11px; color: #666; pointer-events: auto;"></div>
        <button class="close-btn" data-action="close">\xD7</button>
      </div>
      <div class="agent-body">
        <div class="api-key-section" ${this.apiKey?'style="display: none;"':""}>
          <label>Anthropic API Key:</label>
          <input type="text" id="api-key-input" placeholder="sk-..." value="${this.apiKey}">
          <div class="save-options">
            <button data-action="save-session">Use for session</button>
            <button data-action="save-persistent">Save for this website</button>
          </div>
        </div>
        <div class="chat-section">
          <div id="chat-messages"></div>
          <div class="input-section">
            <textarea id="user-input" placeholder="What would you like me to do on this page?"></textarea>
            <div class="send-controls">
              <select id="model-select" data-action="change-model">
                <option value="claude-sonnet-4-20250514" ${this.selectedModel==="claude-sonnet-4-20250514"?"selected":""}>Sonnet 4.0</option>
                <option value="claude-3-5-sonnet-20241022" ${this.selectedModel==="claude-3-5-sonnet-20241022"?"selected":""}>Sonnet 3.5</option>
                <option value="claude-3-5-haiku-20241022" ${this.selectedModel==="claude-3-5-haiku-20241022"?"selected":""}>Haiku 3.5</option>
                <option value="claude-opus-4-20250514" ${this.selectedModel==="claude-opus-4-20250514"?"selected":""}>Opus 4.0</option>
              </select>
              <button data-action="send">Send</button>
            </div>
          </div>
        </div>
      </div>
    `,this.addStyles(),this.addEventListeners(),document.body.appendChild(this.container))}addEventListeners(){if(!this.container)return;this.container.addEventListener("click",e=>{switch(e.target.getAttribute("data-action")){case"close":this.hide();break;case"save-session":this.saveApiKey(!1);break;case"save-persistent":this.saveApiKey(!0);break;case"send":this.sendMessage();break}}),this.container.addEventListener("change",e=>{switch(e.target.getAttribute("data-action")){case"change-model":this.changeModel();break}}),this.container.querySelector("#user-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.sendMessage())}),this.addDragFunctionality()}addDragFunctionality(){if(!this.container)return;let t=this.container.querySelector(".agent-header");if(!t)return;let e=!1,s=0,i=0,n=0,a=0;t.addEventListener("mousedown",o=>{let l=o.target;l.tagName==="BUTTON"||l.tagName==="INPUT"||l.classList.contains("token-usage")||l.closest(".token-usage")||(e=!0,n=o.clientX-this.container.offsetLeft,a=o.clientY-this.container.offsetTop)}),document.addEventListener("mousemove",o=>{if(!e||!this.container)return;o.preventDefault(),s=o.clientX-n,i=o.clientY-a;let l=window.innerWidth-this.container.offsetWidth,c=window.innerHeight-this.container.offsetHeight;s=Math.max(0,Math.min(s,l)),i=Math.max(0,Math.min(i,c)),this.container.style.left=s+"px",this.container.style.top=i+"px",this.container.style.right="auto"}),document.addEventListener("mouseup",()=>{e=!1})}addStyles(){if(document.getElementById("bookmarklet-agent-styles"))return;let t=document.createElement("style");t.id="bookmarklet-agent-styles",t.textContent=`
      #bookmarklet-agent {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 400px;
        max-height: 600px;
        min-width: 300px;
        min-height: 200px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        resize: both;
        overflow: hidden;
      }
      
      .agent-header {
        background: #f8f9fa;
        padding: 12px 16px;
        border-bottom: 1px solid #e9ecef;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        cursor: move;
        user-select: none;
      }
      
      .token-usage {
        flex: 1;
        text-align: center;
        font-size: 10px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: help;
        pointer-events: auto;
      }
      
      .agent-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .agent-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        max-height: 520px;
        overflow: hidden;
      }
      
      .api-key-section {
        margin-bottom: 12px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 4px;
      }
      
      .api-key-section label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .api-key-section input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 8px;
        box-sizing: border-box;
      }
      
      .save-options {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      
      .save-options button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        flex: 1;
      }
      
      .save-options button:hover {
        background: #0056b3;
      }
      
      
      #chat-messages {
        flex: 1;
        overflow-y: auto;
        max-height: 300px;
        margin-bottom: 12px;
        padding-right: 8px;
      }
      
      .message {
        margin-bottom: 8px;
        padding: 6px 10px;
        border-radius: 6px;
        max-width: 90%;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .message.user {
        background: #007bff;
        color: white;
        margin-left: auto;
      }
      
      .message.assistant {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
      }
      
      .message.assistant h1, .message.assistant h2, .message.assistant h3,
      .message.assistant h4, .message.assistant h5, .message.assistant h6 {
        margin: 8px 0 4px 0;
        font-size: inherit;
        font-weight: 600;
      }
      
      .message.assistant p {
        margin: 4px 0;
      }
      
      .message.assistant ul, .message.assistant ol {
        margin: 4px 0;
        padding-left: 16px;
      }
      
      .message.assistant li {
        margin: 2px 0;
      }
      
      .message.assistant code {
        background: rgba(0,0,0,0.1);
        padding: 1px 3px;
        border-radius: 2px;
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 12px;
      }
      
      .message.assistant pre {
        background: rgba(0,0,0,0.05);
        padding: 8px;
        border-radius: 4px;
        overflow-x: auto;
        margin: 4px 0;
      }
      
      .message.assistant pre code {
        background: none;
        padding: 0;
      }
      
      .message.assistant blockquote {
        border-left: 3px solid #ddd;
        margin: 4px 0;
        padding-left: 12px;
        color: #666;
      }
      
      .tool-result-preview, .tool-result-full {
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 12px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .expand-tool-result {
        background: #007bff;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        color: white;
        cursor: pointer;
        margin-top: 8px;
        font-weight: 500;
        display: inline-block;
      }
      
      .expand-tool-result:hover {
        background: #0056b3;
      }
      
      .input-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      #user-input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        min-height: 40px;
        max-height: 120px;
        font-family: inherit;
      }
      
      .send-controls {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .send-controls select {
        padding: 6px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        font-size: 12px;
        color: #666;
      }
      
      .send-controls button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        flex: 1;
      }
      
      .thinking {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        color: #666;
        font-style: italic;
      }
      
      .thinking-dots {
        display: inline-flex;
        gap: 2px;
      }
      
      .thinking-dots span {
        width: 4px;
        height: 4px;
        background: #666;
        border-radius: 50%;
        animation: thinking 1.4s ease-in-out infinite both;
      }
      
      .thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
      .thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
      .thinking-dots span:nth-child(3) { animation-delay: 0s; }
      
      @keyframes thinking {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        } 40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `,document.head.appendChild(t)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0)}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1)}toggle(){this.isVisible?this.hide():this.show()}get eval_results(){return this._eval_results}calculateCost(t,e){let s=this.modelPricing[e];if(!s)return 0;let i=t.input_tokens/1e6*s.input,n=t.output_tokens/1e6*s.output,a=(t.cache_creation_input_tokens||0)/1e6*s.cache_write,o=(t.cache_read_input_tokens||0)/1e6*s.cache_read;return i+n+a+o}updateTokenUsage(t){this.totalTokenUsage.input_tokens+=t.input_tokens,this.totalTokenUsage.output_tokens+=t.output_tokens,this.totalTokenUsage.cache_creation_input_tokens+=t.cache_creation_input_tokens||0,this.totalTokenUsage.cache_read_input_tokens+=t.cache_read_input_tokens||0}formatCost(t){return t<.01?`$${(t*100).toFixed(4)}\xA2`:`$${t.toFixed(4)}`}updateTokenDisplay(){let t=document.getElementById("token-usage");if(!t)return;let e=this.calculateCost(this.totalTokenUsage,this.selectedModel),s=this.totalTokenUsage.input_tokens+this.totalTokenUsage.output_tokens;if(s===0){t.textContent="",t.title="";return}t.textContent=`Tokens: ${s.toLocaleString()} | Cost: ${this.formatCost(e)}`;let i=this.modelPricing[this.selectedModel];if(i){let n=[`Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} \xD7 $${i.input}/M = ${this.formatCost(this.totalTokenUsage.input_tokens/1e6*i.input)}`,`Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} \xD7 $${i.output}/M = ${this.formatCost(this.totalTokenUsage.output_tokens/1e6*i.output)}`];this.totalTokenUsage.cache_creation_input_tokens&&n.push(`Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} \xD7 $${i.cache_write}/M = ${this.formatCost(this.totalTokenUsage.cache_creation_input_tokens/1e6*i.cache_write)}`),this.totalTokenUsage.cache_read_input_tokens&&n.push(`Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} \xD7 $${i.cache_read}/M = ${this.formatCost(this.totalTokenUsage.cache_read_input_tokens/1e6*i.cache_read)}`),t.title=n.join(`
`)}}handleUnauthorized(){this.apiKey="",this.hasEmbeddedApiKey||localStorage.removeItem("bookmarklet-agent-api-key");let t=document.querySelector(".api-key-section");t&&(t.style.display="block");let e=document.getElementById("api-key-input");e&&(e.value="")}saveApiKey(t=!1){let e=document.getElementById("api-key-input");if(this.apiKey=e.value.trim(),t&&!this.hasEmbeddedApiKey&&localStorage.setItem("bookmarklet-agent-api-key",this.apiKey),this.apiKey){let s=document.querySelector(".api-key-section");s&&(s.style.display="none")}}changeModel(){let t=document.getElementById("model-select");this.selectedModel=t.value,localStorage.setItem("bookmarklet-agent-model",this.selectedModel)}showThinking(){this.hideThinking();let t=document.getElementById("chat-messages");if(!t)return;let e=document.createElement("div");e.id="thinking-indicator",e.className="thinking",e.innerHTML=`
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}hideThinking(){let t=document.getElementById("thinking-indicator");t&&t.remove()}async sendMessage(){let t=document.getElementById("user-input"),e=t.value.trim();if(e){if(!this.apiKey){alert("Please enter your Anthropic API key first");return}t.value="",this.addMessage("user",e),this.showThinking();try{await this.runAgentLoop(e)}catch(s){this.addMessage("assistant",`Error: ${s.message}`)}finally{this.hideThinking()}}}async runAgentLoop(t){let e=this.getPageContext(),s=[...this.conversation.filter(i=>i.role!=="system"),{role:"user",content:t}];for(;;){let i=await this.callAnthropicAPIWithMessages(s,e),n="",a=[];for(let l of i.content)l.type==="text"?n+=l.text:l.type==="tool_use"&&a.push({id:l.id,name:l.name,input:l.input});if(s.push({role:"assistant",content:i.content}),n.trim()&&this.addMessage("assistant",n),a.length===0)break;let o=[];for(let l of a){let c=await this.handleToolCall(l);o.push({type:"tool_result",tool_use_id:c.tool_use_id,content:c.content,is_error:c.is_error});let p=`\u{1F527} **${l.name}**
\`\`\`javascript
${JSON.stringify(l.input,null,2)}
\`\`\``,g=c.is_error?`\u274C **Error:**
${c.content}`:`\u2705 **Result:**
${c.content}`,m=`${p}

${g}`;this.addMessage("assistant",m,!0)}s.push({role:"user",content:o})}this.conversation=s.map(i=>({role:i.role,content:typeof i.content=="string"?i.content:JSON.stringify(i.content)}))}addMessage(t,e,s=!1){let i=document.getElementById("chat-messages");if(!i)return;let n=document.createElement("div");if(n.className=`message ${t}`,s){let a=e.split(`
`),o=a.slice(0,2).join(`
`),l=a.length>2;n.innerHTML=`
        <div class="tool-result-preview">${this.escapeHtml(o)}</div>
        ${l?`
          <div class="tool-result-full" style="display: none;">${this.escapeHtml(e)}</div>
          <button class="expand-tool-result" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">\u{1F4CB} Show Full Result</button>
        `:""}
      `}else if(t==="assistant"){let a=this.renderMarkdown(e);n.innerHTML=a}else n.textContent=e;i.appendChild(n),i.scrollTop=i.scrollHeight,this.conversation.push({role:t,content:e})}escapeHtml(t){let e=document.createElement("div");return e.textContent=t,e.innerHTML}getPageContext(){return{url:window.location.href,title:document.title,selectedText:window.getSelection()?.toString()||"",forms:Array.from(document.forms).map(t=>({action:t.action,method:t.method,elements:Array.from(t.elements).map(e=>{let s=e;return{name:s.name,type:s.type,value:s.value}})})),headings:Array.from(document.querySelectorAll("h1, h2, h3")).map(t=>t.textContent?.trim()||"").slice(0,10),links:Array.from(document.querySelectorAll("a[href]")).map(t=>({text:t.textContent?.trim()||"",href:t.href})).slice(0,20)}}async callAnthropicAPIWithMessages(t,e){let s=[{name:"eval_js",description:"Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",input_schema:{type:"object",properties:{code:{type:"string",description:"JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions."}},required:["code"]}}],i=`You are a helpful web agent that can analyze and interact with web pages using tools.
    
Current page context:
- URL: ${e.url}
- Title: ${e.title}
- Selected text: ${e.selectedText||"None"}
- Main headings: ${e.headings.join(", ")}

You have access to the eval_js tool to execute JavaScript code on the page. Use it to interact with elements, extract information, click buttons, fill forms, or perform any web interactions. Large results are automatically truncated but saved to variables for inspection.

IMPORTANT JavaScript Guidelines:
- Never use 'return' statements in your JavaScript code - they cause "Illegal return statement" errors
- Instead of 'return value;', just use 'value;' as the last expression
- Use expressions, not return statements: 'document.title' not 'return document.title'
- For functions, define them but call them: 'function getName() { return "test"; } getName();'
- Use console.log() for debugging, not return statements

Examples:
\u2705 Good: document.querySelectorAll('h1').length
\u2705 Good: Array.from(document.links).map(link => link.href)
\u2705 Good: (() => { const links = document.querySelectorAll('a'); return links.length; })()
\u274C Bad: return document.title
\u274C Bad: return Array.from(document.links)

Be concise and helpful. Always use the eval_js tool when the user asks you to interact with the page.`;try{let n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.selectedModel,max_tokens:1e3,system:[{type:"text",text:i,cache_control:{type:"ephemeral"}}],tools:s,messages:t.map((o,l)=>l===t.length-1&&o.role==="user"?{...o,content:typeof o.content=="string"?[{type:"text",text:o.content,cache_control:{type:"ephemeral"}}]:Array.isArray(o.content)?o.content.map((c,p)=>p===o.content.length-1?{...c,cache_control:{type:"ephemeral"}}:c):o.content}:o)})});if(!n.ok)throw n.status===401?(this.handleUnauthorized(),new Error("Invalid API key. Please enter a valid Anthropic API key.")):new Error(`API request failed: ${n.status}`);let a=await n.json();if(a.usage){this.updateTokenUsage(a.usage),this.updateTokenDisplay();let o=this.calculateCost(a.usage,this.selectedModel);console.log(`Request cost: ${this.formatCost(o)}, Total cost: ${this.formatCost(this.calculateCost(this.totalTokenUsage,this.selectedModel))}`)}return a}catch(n){throw n instanceof TypeError&&n.message.includes("fetch")?new Error(`CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`):n}}async handleToolCall(toolCall){try{switch(toolCall.name){case"eval_js":let code=toolCall.input.code,result=eval(code),resultString=String(result||"Code executed successfully"),maxLength=10*1024;if(resultString.length>maxLength){let t=this._eval_results.length;this._eval_results.push(result);let e=resultString.substring(0,maxLength);return{tool_use_id:toolCall.id,content:`${e}...

[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${t}]]`}}return{tool_use_id:toolCall.id,content:resultString};default:return{tool_use_id:toolCall.id,content:`Unknown tool: ${toolCall.name}`,is_error:!0}}}catch(t){return{tool_use_id:toolCall.id,content:`Error: ${t.message}`,is_error:!0}}}};window.bookmarkletAgent=new _t(window.BOOKMARKLET_API_KEY);})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE *)
*/
