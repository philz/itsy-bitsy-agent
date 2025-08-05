"use strict";(()=>{function st(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ee=st();function Vt(t){ee=t}var fe={exec:()=>null};function b(t,e=""){let i=typeof t=="string"?t:t.source,s={replace:(n,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(M.caret,"$1"),i=i.replace(n,o),s},getRegex:()=>new RegExp(i,e)};return s}var M={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Un=/^(?:[ \t]*(?:\n|$))+/,Hn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Bn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,me=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Fn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rt=/(?:[*+-]|\d{1,9}[.)])/,Qt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jt=b(Qt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gn=b(Qt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ot=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qn=/^[^\n]+/,at=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Wn=b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",at).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jn=b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rt).getRegex(),Ne="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yn=b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",Ne).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),en=b(ot).replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Kn=b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",en).getRegex(),ct={blockquote:Kn,code:Hn,def:Wn,fences:Bn,heading:Fn,hr:me,html:Yn,lheading:Jt,list:jn,newline:Un,paragraph:en,table:fe,text:qn},jt=b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Zn={...ct,lheading:Gn,table:jt,paragraph:b(ot).replace("hr",me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",jt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex()},Xn={...ct,html:b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:fe,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:b(ot).replace("hr",me).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vn=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tn=/^( {2,}|\\)\n(?!\s*$)/,Jn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$e=/[\p{P}\p{S}]/u,pt=/[\s\p{P}\p{S}]/u,nn=/[^\s\p{P}\p{S}]/u,ei=b(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,pt).getRegex(),sn=/(?!~)[\p{P}\p{S}]/u,ti=/(?!~)[\s\p{P}\p{S}]/u,ni=/(?:[^\s\p{P}\p{S}]|~)/u,ii=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,rn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,si=b(rn,"u").replace(/punct/g,$e).getRegex(),ri=b(rn,"u").replace(/punct/g,sn).getRegex(),on="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",oi=b(on,"gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),ai=b(on,"gu").replace(/notPunctSpace/g,ni).replace(/punctSpace/g,ti).replace(/punct/g,sn).getRegex(),li=b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),ci=b(/\\(punct)/,"gu").replace(/punct/g,$e).getRegex(),pi=b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ui=b(lt).replace("(?:-->|$)","-->").getRegex(),hi=b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ui).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Oe=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,di=b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Oe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),an=b(/^!?\[(label)\]\[(ref)\]/).replace("label",Oe).replace("ref",at).getRegex(),ln=b(/^!?\[(ref)\](?:\[\])?/).replace("ref",at).getRegex(),gi=b("reflink|nolink(?!\\()","g").replace("reflink",an).replace("nolink",ln).getRegex(),ut={_backpedal:fe,anyPunctuation:ci,autolink:pi,blockSkip:ii,br:tn,code:Qn,del:fe,emStrongLDelim:si,emStrongRDelimAst:oi,emStrongRDelimUnd:li,escape:Vn,link:di,nolink:ln,punctuation:ei,reflink:an,reflinkSearch:gi,tag:hi,text:Jn,url:fe},fi={...ut,link:b(/^!?\[(label)\]\((.*?)\)/).replace("label",Oe).getRegex(),reflink:b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Oe).getRegex()},tt={...ut,emStrongRDelimAst:ai,emStrongLDelim:ri,url:b(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},mi={...tt,br:b(tn).replace("{2,}","*").getRegex(),text:b(tt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ce={normal:ct,gfm:Zn,pedantic:Xn},de={normal:ut,gfm:tt,breaks:mi,pedantic:fi},ki={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yt=t=>ki[t];function B(t,e){if(e){if(M.escapeTest.test(t))return t.replace(M.escapeReplace,Yt)}else if(M.escapeTestNoEncode.test(t))return t.replace(M.escapeReplaceNoEncode,Yt);return t}function Kt(t){try{t=encodeURI(t).replace(M.percentDecode,"%")}catch{return null}return t}function Zt(t,e){let i=t.replace(M.findPipe,(a,o,l)=>{let c=!1,u=o;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=i.split(M.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(M.slashPipe,"|");return s}function ge(t,e,i){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let a=t.charAt(s-n-1);if(a===e&&!i)n++;else if(a!==e&&i)n++;else break}return t.slice(0,s-n)}function xi(t,e){if(t.indexOf(e[1])===-1)return-1;let i=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])i++;else if(t[s]===e[1]&&(i--,i<0))return s;return i>0?-2:-1}function Xt(t,e,i,s,n){let a=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:i,href:a,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function bi(t,e,i){let s=t.match(i.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(a=>{let o=a.match(i.other.beginningSpace);if(o===null)return a;let[l]=o;return l.length>=n.length?a.slice(n.length):a}).join(`
`)}var Pe=class{options;rules;lexer;constructor(t){this.options=t||ee}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let i=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?i:ge(i,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let i=e[0],s=bi(i,e[3]||"",this.rules);return{type:"code",raw:i,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let i=e[2].trim();if(this.rules.other.endingHash.test(i)){let s=ge(i,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(i=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:ge(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let i=ge(e[0],`
`).split(`
`),s="",n="",a=[];for(;i.length>0;){let o=!1,l=[],c;for(c=0;c<i.length;c++)if(this.rules.other.blockquoteStart.test(i[c]))l.push(i[c]),o=!0;else if(!o)l.push(i[c]);else break;i=i.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,n=n?`${n}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,a,!0),this.lexer.state.top=m,i.length===0)break;let k=a.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let w=k,y=w.raw+`
`+i.join(`
`),N=this.blockquote(y);a[a.length-1]=N,s=s.substring(0,s.length-w.raw.length)+N.raw,n=n.substring(0,n.length-w.text.length)+N.text;break}else if(k?.type==="list"){let w=k,y=w.raw+`
`+i.join(`
`),N=this.list(y);a[a.length-1]=N,s=s.substring(0,s.length-k.raw.length)+N.raw,n=n.substring(0,n.length-w.raw.length)+N.raw,i=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let i=e[1].trim(),s=i.length>1,n={type:"list",raw:"",ordered:s,start:s?+i.slice(0,-1):"",loose:!1,items:[]};i=s?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=s?i:"[*+-]");let a=this.rules.other.listItemRegex(i),o=!1;for(;t;){let c=!1,u="",f="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,le=>" ".repeat(3*le.length)),k=t.split(`
`,1)[0],w=!m.trim(),y=0;if(this.options.pedantic?(y=2,f=m.trimStart()):w?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,f=m.slice(y),y+=e[1].length),w&&this.rules.other.blankLine.test(k)&&(u+=k+`
`,t=t.substring(k.length+1),c=!0),!c){let le=this.rules.other.nextBulletRegex(y),we=this.rules.other.hrRegex(y),K=this.rules.other.fencesBeginRegex(y),A=this.rules.other.headingBeginRegex(y),Z=this.rules.other.htmlBeginRegex(y);for(;t;){let X=t.split(`
`,1)[0],V;if(k=X,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),V=k):V=k.replace(this.rules.other.tabCharGlobal,"    "),K.test(k)||A.test(k)||Z.test(k)||le.test(k)||we.test(k))break;if(V.search(this.rules.other.nonSpaceChar)>=y||!k.trim())f+=`
`+V.slice(y);else{if(w||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(m)||A.test(m)||we.test(m))break;f+=`
`+k}!w&&!k.trim()&&(w=!0),u+=X+`
`,t=t.substring(X.length+1),m=V.slice(y)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0));let N=null,Te;this.options.gfm&&(N=this.rules.other.listIsTask.exec(f),N&&(Te=N[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:u,task:!!N,checked:Te,loose:!1,text:f,tokens:[]}),n.raw+=u}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c=0;c<n.items.length;c++)if(this.lexer.state.top=!1,n.items[c].tokens=this.lexer.blockTokens(n.items[c].text,[]),!n.loose){let u=n.items[c].tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));n.loose=f}if(n.loose)for(let c=0;c<n.items.length;c++)n.items[c].loose=!0;return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let i=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:i,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let i=Zt(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(i.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<i.length;o++)a.header.push({text:i[o],tokens:this.lexer.inline(i[o]),header:!0,align:a.align[o]});for(let o of n)a.rows.push(Zt(o,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let i=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:i,tokens:this.lexer.inline(i)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let i=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(i)){if(!this.rules.other.endAngleBracket.test(i))return;let a=ge(i.slice(0,-1),"\\");if((i.length-a.length)%2===0)return}else{let a=xi(e[2],"()");if(a===-2)return;if(a>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],n=a[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(i)?s=s.slice(1):s=s.slice(1,-1)),Xt(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let i;if((i=this.rules.inline.reflink.exec(t))||(i=this.rules.inline.nolink.exec(t))){let s=(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let a=i[0].charAt(0);return{type:"text",raw:a,text:a}}return Xt(i,n,i[0],this.lexer,this.rules)}}emStrong(t,e,i=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!i||this.rules.inline.punctuation.exec(i))){let n=[...s[0]].length-1,a,o,l=n,c=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+n);(s=u.exec(e))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(o=[...a].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){c+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+c);let f=[...s[0]][0].length,m=t.slice(0,n+s.index+f+o);if(Math.min(n,o)%2){let w=m.slice(1,-1);return{type:"em",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}let k=m.slice(2,-2);return{type:"strong",raw:m,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let i=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(i),n=this.rules.other.startingSpaceChar.test(i)&&this.rules.other.endingSpaceChar.test(i);return s&&n&&(i=i.substring(1,i.length-1)),{type:"codespan",raw:e[0],text:i}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let i,s;return e[2]==="@"?(i=e[1],s="mailto:"+i):(i=e[1],s=i),{type:"link",raw:e[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let i,s;if(e[2]==="@")i=e[0],s="mailto:"+i;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);i=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let i=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:i}}}},W=class nt{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ee,this.options.tokenizer=this.options.tokenizer||new Pe,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let i={other:M,block:Ce.normal,inline:de.normal};this.options.pedantic?(i.block=Ce.pedantic,i.inline=de.pedantic):this.options.gfm&&(i.block=Ce.gfm,this.options.breaks?i.inline=de.breaks:i.inline=de.gfm),this.tokenizer.rules=i}static get rules(){return{block:Ce,inline:de}}static lex(e,i){return new nt(i).lex(e)}static lexInline(e,i){return new nt(i).inlineTokens(e)}lex(e){e=e.replace(M.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let i=0;i<this.inlineQueue.length;i++){let s=this.inlineQueue[i];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,i=[],s=!1){for(this.options.pedantic&&(e=e.replace(M.tabCharGlobal,"    ").replace(M.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,i))?(e=e.substring(n.raw.length),i.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=i.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:i.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=i.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):i.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=i.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),i.push(n);continue}let a=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(o=Math.min(o,c))}),o<1/0&&o>=0&&(a=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){let o=i.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):i.push(n),s=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=i.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):i.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,i}inline(e,i=[]){return this.inlineQueue.push({src:e,tokens:i}),i}inlineTokens(e,i=[]){let s=e,n=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;e;){a||(o=""),a=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},e,i))?(e=e.substring(l.raw.length),i.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let u=i.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):i.push(l);continue}if(l=this.tokenizer.emStrong(e,s,o)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),i.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),i.push(l);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,f=e.slice(1),m;this.options.extensions.startInline.forEach(k=>{m=k.call({lexer:this},f),typeof m=="number"&&m>=0&&(u=Math.min(u,m))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;let u=i.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):i.push(l);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return i}},De=class{options;parser;constructor(t){this.options=t||ee}space(t){return""}code({text:t,lang:e,escaped:i}){let s=(e||"").match(M.notSpaceStart)?.[0],n=t.replace(M.endingNewline,"")+`
`;return s?'<pre><code class="language-'+B(s)+'">'+(i?n:B(n,!0))+`</code></pre>
`:"<pre><code>"+(i?n:B(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,i=t.start,s="";for(let o=0;o<t.items.length;o++){let l=t.items[o];s+=this.listitem(l)}let n=e?"ol":"ul",a=e&&i!==1?' start="'+i+'"':"";return"<"+n+a+`>
`+s+"</"+n+`>
`}listitem(t){let e="";if(t.task){let i=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=i+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=i+" "+B(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):e+=i+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",i="";for(let n=0;n<t.header.length;n++)i+=this.tablecell(t.header[n]);e+=this.tablerow({text:i});let s="";for(let n=0;n<t.rows.length;n++){let a=t.rows[n];i="";for(let o=0;o<a.length;o++)i+=this.tablecell(a[o]);s+=this.tablerow({text:i})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${B(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:i}){let s=this.parser.parseInline(i),n=Kt(t);if(n===null)return s;t=n;let a='<a href="'+t+'"';return e&&(a+=' title="'+B(e)+'"'),a+=">"+s+"</a>",a}image({href:t,title:e,text:i,tokens:s}){s&&(i=this.parser.parseInline(s,this.parser.textRenderer));let n=Kt(t);if(n===null)return B(i);t=n;let a=`<img src="${t}" alt="${i}"`;return e&&(a+=` title="${B(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:B(t.text)}},ht=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},j=class it{options;renderer;textRenderer;constructor(e){this.options=e||ee,this.options.renderer=this.options.renderer||new De,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ht}static parse(e,i){return new it(i).parse(e)}static parseInline(e,i){return new it(i).parseInline(e)}parse(e,i=!0){let s="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=a,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=c||"";continue}}let o=a;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,c=this.renderer.text(l);for(;n+1<e.length&&e[n+1].type==="text";)l=e[++n],c+=`
`+this.renderer.text(l);i?s+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):s+=c;continue}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,i=this.renderer){let s="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){s+=l||"";continue}}let o=a;switch(o.type){case"escape":{s+=i.text(o);break}case"html":{s+=i.html(o);break}case"link":{s+=i.link(o);break}case"image":{s+=i.image(o);break}case"strong":{s+=i.strong(o);break}case"em":{s+=i.em(o);break}case"codespan":{s+=i.codespan(o);break}case"br":{s+=i.br(o);break}case"del":{s+=i.del(o);break}case"text":{s+=i.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Me=class{options;block;constructor(t){this.options=t||ee}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?W.lex:W.lexInline}provideParser(){return this.block?j.parse:j.parseInline}},yi=class{defaults=st();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=j;Renderer=De;TextRenderer=ht;Lexer=W;Tokenizer=Pe;Hooks=Me;constructor(...t){this.use(...t)}walkTokens(t,e){let i=[];for(let s of t)switch(i=i.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let a of n.header)i=i.concat(this.walkTokens(a.tokens,e));for(let a of n.rows)for(let o of a)i=i.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;i=i.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(a=>{let o=n[a].flat(1/0);i=i.concat(this.walkTokens(o,e))}):n.tokens&&(i=i.concat(this.walkTokens(n.tokens,e)))}}return i}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(i=>{let s={...i};if(s.async=this.defaults.async||s.async||!1,i.extensions&&(i.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let a=e.renderers[n.name];a?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=a.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[n.level];a?a.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),i.renderer){let n=this.defaults.renderer||new De(this.defaults);for(let a in i.renderer){if(!(a in n))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let o=a,l=i.renderer[o],c=n[o];n[o]=(...u)=>{let f=l.apply(n,u);return f===!1&&(f=c.apply(n,u)),f||""}}s.renderer=n}if(i.tokenizer){let n=this.defaults.tokenizer||new Pe(this.defaults);for(let a in i.tokenizer){if(!(a in n))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let o=a,l=i.tokenizer[o],c=n[o];n[o]=(...u)=>{let f=l.apply(n,u);return f===!1&&(f=c.apply(n,u)),f}}s.tokenizer=n}if(i.hooks){let n=this.defaults.hooks||new Me;for(let a in i.hooks){if(!(a in n))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let o=a,l=i.hooks[o],c=n[o];Me.passThroughHooks.has(a)?n[o]=u=>{if(this.defaults.async)return Promise.resolve(l.call(n,u)).then(m=>c.call(n,m));let f=l.call(n,u);return c.call(n,f)}:n[o]=(...u)=>{let f=l.apply(n,u);return f===!1&&(f=c.apply(n,u)),f}}s.hooks=n}if(i.walkTokens){let n=this.defaults.walkTokens,a=i.walkTokens;s.walkTokens=function(o){let l=[];return l.push(a.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return W.lex(t,e??this.defaults)}parser(t,e){return j.parse(t,e??this.defaults)}parseMarkdown(t){return(e,i)=>{let s={...i},n={...this.defaults,...s},a=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));n.hooks&&(n.hooks.options=n,n.hooks.block=t);let o=n.hooks?n.hooks.provideLexer():t?W.lex:W.lexInline,l=n.hooks?n.hooks.provideParser():t?j.parse:j.parseInline;if(n.async)return Promise.resolve(n.hooks?n.hooks.preprocess(e):e).then(c=>o(c,n)).then(c=>n.hooks?n.hooks.processAllTokens(c):c).then(c=>n.walkTokens?Promise.all(this.walkTokens(c,n.walkTokens)).then(()=>c):c).then(c=>l(c,n)).then(c=>n.hooks?n.hooks.postprocess(c):c).catch(a);try{n.hooks&&(e=n.hooks.preprocess(e));let c=o(e,n);n.hooks&&(c=n.hooks.processAllTokens(c)),n.walkTokens&&this.walkTokens(c,n.walkTokens);let u=l(c,n);return n.hooks&&(u=n.hooks.postprocess(u)),u}catch(c){return a(c)}}}onError(t,e){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+B(i.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(i);throw i}}},J=new yi;function x(t,e){return J.parse(t,e)}x.options=x.setOptions=function(t){return J.setOptions(t),x.defaults=J.defaults,Vt(x.defaults),x};x.getDefaults=st;x.defaults=ee;x.use=function(...t){return J.use(...t),x.defaults=J.defaults,Vt(x.defaults),x};x.walkTokens=function(t,e){return J.walkTokens(t,e)};x.parseInline=J.parseInline;x.Parser=j;x.parser=j.parse;x.Renderer=De;x.TextRenderer=ht;x.Lexer=W;x.lexer=W.lex;x.Tokenizer=Pe;x.Hooks=Me;x.parse=x;var Fi=x.options,Gi=x.setOptions,qi=x.use,Wi=x.walkTokens,ji=x.parseInline;var Yi=j.parse,Ki=W.lex;var{entries:xn,setPrototypeOf:cn,isFrozen:_i,getPrototypeOf:Ti,getOwnPropertyDescriptor:wi}=Object,{freeze:P,seal:z,create:bn}=Object,{apply:xt,construct:bt}=typeof Reflect<"u"&&Reflect;P||(P=function(e){return e});z||(z=function(e){return e});xt||(xt=function(e,i,s){return e.apply(i,s)});bt||(bt=function(e,i){return new e(...i)});var ze=D(Array.prototype.forEach),Ei=D(Array.prototype.lastIndexOf),pn=D(Array.prototype.pop),ke=D(Array.prototype.push),Ai=D(Array.prototype.splice),He=D(String.prototype.toLowerCase),dt=D(String.prototype.toString),un=D(String.prototype.match),xe=D(String.prototype.replace),Si=D(String.prototype.indexOf),vi=D(String.prototype.trim),U=D(Object.prototype.hasOwnProperty),O=D(RegExp.prototype.test),be=Ri(TypeError);function D(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var i=arguments.length,s=new Array(i>1?i-1:0),n=1;n<i;n++)s[n-1]=arguments[n];return xt(t,e,s)}}function Ri(t){return function(){for(var e=arguments.length,i=new Array(e),s=0;s<e;s++)i[s]=arguments[s];return bt(t,i)}}function g(t,e){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:He;cn&&cn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let a=i(n);a!==n&&(_i(e)||(e[s]=a),n=a)}t[n]=!0}return t}function Li(t){for(let e=0;e<t.length;e++)U(t,e)||(t[e]=null);return t}function Y(t){let e=bn(null);for(let[i,s]of xn(t))U(t,i)&&(Array.isArray(s)?e[i]=Li(s):s&&typeof s=="object"&&s.constructor===Object?e[i]=Y(s):e[i]=s);return e}function ye(t,e){for(;t!==null;){let s=wi(t,e);if(s){if(s.get)return D(s.get);if(typeof s.value=="function")return D(s.value)}t=Ti(t)}function i(){return null}return i}var hn=P(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gt=P(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ft=P(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ii=P(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mt=P(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ci=P(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),dn=P(["#text"]),gn=P(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),kt=P(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fn=P(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ue=P(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Mi=z(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Oi=z(/<%[\w\W]*|[\w\W]*%>/gm),Pi=z(/\$\{[\w\W]*/gm),Di=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ni=z(/^aria-[\-\w]+$/),yn=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$i=z(/^(?:\w+script|data):/i),zi=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_n=z(/^html$/i),Ui=z(/^[a-z][.\w]*(-[.\w]+)+$/i),mn=Object.freeze({__proto__:null,ARIA_ATTR:Ni,ATTR_WHITESPACE:zi,CUSTOM_ELEMENT:Ui,DATA_ATTR:Di,DOCTYPE_NAME:_n,ERB_EXPR:Oi,IS_ALLOWED_URI:yn,IS_SCRIPT_OR_DATA:$i,MUSTACHE_EXPR:Mi,TMPLIT_EXPR:Pi}),_e={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Hi=function(){return typeof window>"u"?null:window},Bi=function(e,i){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";i&&i.hasAttribute(n)&&(s=i.getAttribute(n));let a="dompurify"+(s?"#"+s:"");try{return e.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},kn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Tn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hi(),e=d=>Tn(d);if(e.version="3.2.6",e.removed=[],!t||!t.document||t.document.nodeType!==_e.document||!t.Element)return e.isSupported=!1,e;let{document:i}=t,s=i,n=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:k,trustedTypes:w}=t,y=c.prototype,N=ye(y,"cloneNode"),Te=ye(y,"remove"),le=ye(y,"nextSibling"),we=ye(y,"childNodes"),K=ye(y,"parentNode");if(typeof o=="function"){let d=i.createElement("template");d.content&&d.content.ownerDocument&&(i=d.content.ownerDocument)}let A,Z="",{implementation:X,createNodeIterator:V,createDocumentFragment:En,getElementsByTagName:An}=i,{importNode:Sn}=s,C=kn();e.isSupported=typeof xn=="function"&&typeof K=="function"&&X&&X.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Be,ERB_EXPR:Fe,TMPLIT_EXPR:Ge,DATA_ATTR:vn,ARIA_ATTR:Rn,IS_SCRIPT_OR_DATA:Ln,ATTR_WHITESPACE:_t,CUSTOM_ELEMENT:In}=mn,{IS_ALLOWED_URI:Tt}=mn,S=null,wt=g({},[...hn,...gt,...ft,...mt,...dn]),R=null,Et=g({},[...gn,...kt,...fn,...Ue]),T=Object.seal(bn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ce=null,qe=null,At=!0,We=!0,St=!1,vt=!0,te=!1,Ee=!0,Q=!1,je=!1,Ye=!1,ne=!1,Ae=!1,Se=!1,Rt=!0,Lt=!1,Cn="user-content-",Ke=!0,pe=!1,ie={},se=null,It=g({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ct=null,Mt=g({},["audio","video","img","source","image","track"]),Ze=null,Ot=g({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ve="http://www.w3.org/1998/Math/MathML",Re="http://www.w3.org/2000/svg",F="http://www.w3.org/1999/xhtml",re=F,Xe=!1,Ve=null,Mn=g({},[ve,Re,F],dt),Le=g({},["mi","mo","mn","ms","mtext"]),Ie=g({},["annotation-xml"]),On=g({},["title","style","font","a","script"]),ue=null,Pn=["application/xhtml+xml","text/html"],Dn="text/html",v=null,oe=null,Nn=i.createElement("form"),Pt=function(r){return r instanceof RegExp||r instanceof Function},Qe=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(oe&&oe===r)){if((!r||typeof r!="object")&&(r={}),r=Y(r),ue=Pn.indexOf(r.PARSER_MEDIA_TYPE)===-1?Dn:r.PARSER_MEDIA_TYPE,v=ue==="application/xhtml+xml"?dt:He,S=U(r,"ALLOWED_TAGS")?g({},r.ALLOWED_TAGS,v):wt,R=U(r,"ALLOWED_ATTR")?g({},r.ALLOWED_ATTR,v):Et,Ve=U(r,"ALLOWED_NAMESPACES")?g({},r.ALLOWED_NAMESPACES,dt):Mn,Ze=U(r,"ADD_URI_SAFE_ATTR")?g(Y(Ot),r.ADD_URI_SAFE_ATTR,v):Ot,Ct=U(r,"ADD_DATA_URI_TAGS")?g(Y(Mt),r.ADD_DATA_URI_TAGS,v):Mt,se=U(r,"FORBID_CONTENTS")?g({},r.FORBID_CONTENTS,v):It,ce=U(r,"FORBID_TAGS")?g({},r.FORBID_TAGS,v):Y({}),qe=U(r,"FORBID_ATTR")?g({},r.FORBID_ATTR,v):Y({}),ie=U(r,"USE_PROFILES")?r.USE_PROFILES:!1,At=r.ALLOW_ARIA_ATTR!==!1,We=r.ALLOW_DATA_ATTR!==!1,St=r.ALLOW_UNKNOWN_PROTOCOLS||!1,vt=r.ALLOW_SELF_CLOSE_IN_ATTR!==!1,te=r.SAFE_FOR_TEMPLATES||!1,Ee=r.SAFE_FOR_XML!==!1,Q=r.WHOLE_DOCUMENT||!1,ne=r.RETURN_DOM||!1,Ae=r.RETURN_DOM_FRAGMENT||!1,Se=r.RETURN_TRUSTED_TYPE||!1,Ye=r.FORCE_BODY||!1,Rt=r.SANITIZE_DOM!==!1,Lt=r.SANITIZE_NAMED_PROPS||!1,Ke=r.KEEP_CONTENT!==!1,pe=r.IN_PLACE||!1,Tt=r.ALLOWED_URI_REGEXP||yn,re=r.NAMESPACE||F,Le=r.MATHML_TEXT_INTEGRATION_POINTS||Le,Ie=r.HTML_INTEGRATION_POINTS||Ie,T=r.CUSTOM_ELEMENT_HANDLING||{},r.CUSTOM_ELEMENT_HANDLING&&Pt(r.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(T.tagNameCheck=r.CUSTOM_ELEMENT_HANDLING.tagNameCheck),r.CUSTOM_ELEMENT_HANDLING&&Pt(r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(T.attributeNameCheck=r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),r.CUSTOM_ELEMENT_HANDLING&&typeof r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),te&&(We=!1),Ae&&(ne=!0),ie&&(S=g({},dn),R=[],ie.html===!0&&(g(S,hn),g(R,gn)),ie.svg===!0&&(g(S,gt),g(R,kt),g(R,Ue)),ie.svgFilters===!0&&(g(S,ft),g(R,kt),g(R,Ue)),ie.mathMl===!0&&(g(S,mt),g(R,fn),g(R,Ue))),r.ADD_TAGS&&(S===wt&&(S=Y(S)),g(S,r.ADD_TAGS,v)),r.ADD_ATTR&&(R===Et&&(R=Y(R)),g(R,r.ADD_ATTR,v)),r.ADD_URI_SAFE_ATTR&&g(Ze,r.ADD_URI_SAFE_ATTR,v),r.FORBID_CONTENTS&&(se===It&&(se=Y(se)),g(se,r.FORBID_CONTENTS,v)),Ke&&(S["#text"]=!0),Q&&g(S,["html","head","body"]),S.table&&(g(S,["tbody"]),delete ce.tbody),r.TRUSTED_TYPES_POLICY){if(typeof r.TRUSTED_TYPES_POLICY.createHTML!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof r.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=r.TRUSTED_TYPES_POLICY,Z=A.createHTML("")}else A===void 0&&(A=Bi(w,n)),A!==null&&typeof Z=="string"&&(Z=A.createHTML(""));P&&P(r),oe=r}},Dt=g({},[...gt,...ft,...Ii]),Nt=g({},[...mt,...Ci]),$n=function(r){let p=K(r);(!p||!p.tagName)&&(p={namespaceURI:re,tagName:"template"});let h=He(r.tagName),_=He(p.tagName);return Ve[r.namespaceURI]?r.namespaceURI===Re?p.namespaceURI===F?h==="svg":p.namespaceURI===ve?h==="svg"&&(_==="annotation-xml"||Le[_]):!!Dt[h]:r.namespaceURI===ve?p.namespaceURI===F?h==="math":p.namespaceURI===Re?h==="math"&&Ie[_]:!!Nt[h]:r.namespaceURI===F?p.namespaceURI===Re&&!Ie[_]||p.namespaceURI===ve&&!Le[_]?!1:!Nt[h]&&(On[h]||!Dt[h]):!!(ue==="application/xhtml+xml"&&Ve[r.namespaceURI]):!1},H=function(r){ke(e.removed,{element:r});try{K(r).removeChild(r)}catch{Te(r)}},ae=function(r,p){try{ke(e.removed,{attribute:p.getAttributeNode(r),from:p})}catch{ke(e.removed,{attribute:null,from:p})}if(p.removeAttribute(r),r==="is")if(ne||Ae)try{H(p)}catch{}else try{p.setAttribute(r,"")}catch{}},$t=function(r){let p=null,h=null;if(Ye)r="<remove></remove>"+r;else{let E=un(r,/^[\r\n\t ]+/);h=E&&E[0]}ue==="application/xhtml+xml"&&re===F&&(r='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+r+"</body></html>");let _=A?A.createHTML(r):r;if(re===F)try{p=new k().parseFromString(_,ue)}catch{}if(!p||!p.documentElement){p=X.createDocument(re,"template",null);try{p.documentElement.innerHTML=Xe?Z:_}catch{}}let L=p.body||p.documentElement;return r&&h&&L.insertBefore(i.createTextNode(h),L.childNodes[0]||null),re===F?An.call(p,Q?"html":"body")[0]:Q?p.documentElement:L},zt=function(r){return V.call(r.ownerDocument||r,r,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Je=function(r){return r instanceof m&&(typeof r.nodeName!="string"||typeof r.textContent!="string"||typeof r.removeChild!="function"||!(r.attributes instanceof f)||typeof r.removeAttribute!="function"||typeof r.setAttribute!="function"||typeof r.namespaceURI!="string"||typeof r.insertBefore!="function"||typeof r.hasChildNodes!="function")},Ut=function(r){return typeof l=="function"&&r instanceof l};function G(d,r,p){ze(d,h=>{h.call(e,r,p,oe)})}let Ht=function(r){let p=null;if(G(C.beforeSanitizeElements,r,null),Je(r))return H(r),!0;let h=v(r.nodeName);if(G(C.uponSanitizeElement,r,{tagName:h,allowedTags:S}),Ee&&r.hasChildNodes()&&!Ut(r.firstElementChild)&&O(/<[/\w!]/g,r.innerHTML)&&O(/<[/\w!]/g,r.textContent)||r.nodeType===_e.progressingInstruction||Ee&&r.nodeType===_e.comment&&O(/<[/\w]/g,r.data))return H(r),!0;if(!S[h]||ce[h]){if(!ce[h]&&Ft(h)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h)))return!1;if(Ke&&!se[h]){let _=K(r)||r.parentNode,L=we(r)||r.childNodes;if(L&&_){let E=L.length;for(let $=E-1;$>=0;--$){let q=N(L[$],!0);q.__removalCount=(r.__removalCount||0)+1,_.insertBefore(q,le(r))}}}return H(r),!0}return r instanceof c&&!$n(r)||(h==="noscript"||h==="noembed"||h==="noframes")&&O(/<\/no(script|embed|frames)/i,r.innerHTML)?(H(r),!0):(te&&r.nodeType===_e.text&&(p=r.textContent,ze([Be,Fe,Ge],_=>{p=xe(p,_," ")}),r.textContent!==p&&(ke(e.removed,{element:r.cloneNode()}),r.textContent=p)),G(C.afterSanitizeElements,r,null),!1)},Bt=function(r,p,h){if(Rt&&(p==="id"||p==="name")&&(h in i||h in Nn))return!1;if(!(We&&!qe[p]&&O(vn,p))){if(!(At&&O(Rn,p))){if(!R[p]||qe[p]){if(!(Ft(r)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,r)||T.tagNameCheck instanceof Function&&T.tagNameCheck(r))&&(T.attributeNameCheck instanceof RegExp&&O(T.attributeNameCheck,p)||T.attributeNameCheck instanceof Function&&T.attributeNameCheck(p))||p==="is"&&T.allowCustomizedBuiltInElements&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h))))return!1}else if(!Ze[p]){if(!O(Tt,xe(h,_t,""))){if(!((p==="src"||p==="xlink:href"||p==="href")&&r!=="script"&&Si(h,"data:")===0&&Ct[r])){if(!(St&&!O(Ln,xe(h,_t,"")))){if(h)return!1}}}}}}return!0},Ft=function(r){return r!=="annotation-xml"&&un(r,In)},Gt=function(r){G(C.beforeSanitizeAttributes,r,null);let{attributes:p}=r;if(!p||Je(r))return;let h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:R,forceKeepAttr:void 0},_=p.length;for(;_--;){let L=p[_],{name:E,namespaceURI:$,value:q}=L,he=v(E),et=q,I=E==="value"?et:vi(et);if(h.attrName=he,h.attrValue=I,h.keepAttr=!0,h.forceKeepAttr=void 0,G(C.uponSanitizeAttribute,r,h),I=h.attrValue,Lt&&(he==="id"||he==="name")&&(ae(E,r),I=Cn+I),Ee&&O(/((--!?|])>)|<\/(style|title)/i,I)){ae(E,r);continue}if(h.forceKeepAttr)continue;if(!h.keepAttr){ae(E,r);continue}if(!vt&&O(/\/>/i,I)){ae(E,r);continue}te&&ze([Be,Fe,Ge],Wt=>{I=xe(I,Wt," ")});let qt=v(r.nodeName);if(!Bt(qt,he,I)){ae(E,r);continue}if(A&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!$)switch(w.getAttributeType(qt,he)){case"TrustedHTML":{I=A.createHTML(I);break}case"TrustedScriptURL":{I=A.createScriptURL(I);break}}if(I!==et)try{$?r.setAttributeNS($,E,I):r.setAttribute(E,I),Je(r)?H(r):pn(e.removed)}catch{ae(E,r)}}G(C.afterSanitizeAttributes,r,null)},zn=function d(r){let p=null,h=zt(r);for(G(C.beforeSanitizeShadowDOM,r,null);p=h.nextNode();)G(C.uponSanitizeShadowNode,p,null),Ht(p),Gt(p),p.content instanceof a&&d(p.content);G(C.afterSanitizeShadowDOM,r,null)};return e.sanitize=function(d){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,h=null,_=null,L=null;if(Xe=!d,Xe&&(d="<!-->"),typeof d!="string"&&!Ut(d))if(typeof d.toString=="function"){if(d=d.toString(),typeof d!="string")throw be("dirty is not a string, aborting")}else throw be("toString is not a function");if(!e.isSupported)return d;if(je||Qe(r),e.removed=[],typeof d=="string"&&(pe=!1),pe){if(d.nodeName){let q=v(d.nodeName);if(!S[q]||ce[q])throw be("root node is forbidden and cannot be sanitized in-place")}}else if(d instanceof l)p=$t("<!---->"),h=p.ownerDocument.importNode(d,!0),h.nodeType===_e.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?p=h:p.appendChild(h);else{if(!ne&&!te&&!Q&&d.indexOf("<")===-1)return A&&Se?A.createHTML(d):d;if(p=$t(d),!p)return ne?null:Se?Z:""}p&&Ye&&H(p.firstChild);let E=zt(pe?d:p);for(;_=E.nextNode();)Ht(_),Gt(_),_.content instanceof a&&zn(_.content);if(pe)return d;if(ne){if(Ae)for(L=En.call(p.ownerDocument);p.firstChild;)L.appendChild(p.firstChild);else L=p;return(R.shadowroot||R.shadowrootmode)&&(L=Sn.call(s,L,!0)),L}let $=Q?p.outerHTML:p.innerHTML;return Q&&S["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&O(_n,p.ownerDocument.doctype.name)&&($="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+$),te&&ze([Be,Fe,Ge],q=>{$=xe($,q," ")}),A&&Se?A.createHTML($):$},e.setConfig=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Qe(d),je=!0},e.clearConfig=function(){oe=null,je=!1},e.isValidAttribute=function(d,r,p){oe||Qe({});let h=v(d),_=v(r);return Bt(h,_,p)},e.addHook=function(d,r){typeof r=="function"&&ke(C[d],r)},e.removeHook=function(d,r){if(r!==void 0){let p=Ei(C[d],r);return p===-1?void 0:Ai(C[d],p,1)[0]}return pn(C[d])},e.removeHooks=function(d){C[d]=[]},e.removeAllHooks=function(){C=kn()},e}var wn=Tn();var yt=class{constructor(t){this.isVisible=!1;this.conversation=[];this.container=null;this.hasEmbeddedApiKey=!1;this._eval_results=[];this.totalTokenUsage={input_tokens:0,output_tokens:0,cache_creation_input_tokens:0,cache_read_input_tokens:0};this.modelPricing={"claude-sonnet-4-20250514":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-sonnet-20241022":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-haiku-20241022":{input:.8,output:4,cache_write:1,cache_read:.08},"claude-opus-4-20250514":{input:15,output:75,cache_write:18.75,cache_read:1.5}};t?(this.apiKey=t,this.hasEmbeddedApiKey=!0):(this.apiKey=localStorage.getItem("bookmarklet-agent-api-key")||"",this.hasEmbeddedApiKey=!1),this.selectedModel=localStorage.getItem("bookmarklet-agent-model")||"claude-sonnet-4-20250514"}init(){this.createUI(),this.show()}renderMarkdown(t){try{let e=x.parse(t);return wn.sanitize(e)}catch(e){return console.warn("Markdown rendering failed:",e),t.replace(/\n/g,"<br>")}}createUI(){this.container||(this.container=document.createElement("div"),this.container.id="bookmarklet-agent",this.container.innerHTML=`
      <div class="agent-header">
        <h3>Itsy Bitsy Agent</h3>
        <div class="token-usage" id="token-usage" style="font-size: 11px; color: #666; pointer-events: auto;">
          <div class="token-tooltip" id="token-tooltip"></div>
        </div>
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
    `,this.addStyles(),this.addEventListeners(),document.body.appendChild(this.container))}addEventListeners(){if(!this.container)return;this.container.addEventListener("click",e=>{switch(e.target.getAttribute("data-action")){case"close":this.hide();break;case"save-session":this.saveApiKey(!1);break;case"save-persistent":this.saveApiKey(!0);break;case"send":this.sendMessage();break}}),this.container.addEventListener("change",e=>{switch(e.target.getAttribute("data-action")){case"change-model":this.changeModel();break}}),this.container.querySelector("#user-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.sendMessage())}),this.addDragFunctionality()}addDragFunctionality(){if(!this.container)return;let t=this.container.querySelector(".agent-header");if(!t)return;let e=!1,i=0,s=0,n=0,a=0;t.addEventListener("mousedown",o=>{let l=o.target;l.tagName==="BUTTON"||l.tagName==="INPUT"||l.classList.contains("token-usage")||l.closest(".token-usage")||(e=!0,n=o.clientX-this.container.offsetLeft,a=o.clientY-this.container.offsetTop)}),document.addEventListener("mousemove",o=>{if(!e||!this.container)return;o.preventDefault(),i=o.clientX-n,s=o.clientY-a;let l=window.innerWidth-this.container.offsetWidth,c=window.innerHeight-this.container.offsetHeight;i=Math.max(0,Math.min(i,l)),s=Math.max(0,Math.min(s,c)),this.container.style.left=i+"px",this.container.style.top=s+"px",this.container.style.right="auto"}),document.addEventListener("mouseup",()=>{e=!1})}addStyles(){if(document.getElementById("bookmarklet-agent-styles"))return;let t=document.createElement("style");t.id="bookmarklet-agent-styles",t.textContent=`
      /* CSS Reset and isolation for bookmarklet */
      #bookmarklet-agent, #bookmarklet-agent * {
        all: unset;
        box-sizing: border-box !important;
      }
      
      #bookmarklet-agent {
        /* CSS Reset */
        all: unset;
        /* Explicit styles */
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 400px !important;
        max-height: 600px !important;
        min-width: 300px !important;
        min-height: 200px !important;
        background: white !important;
        border: 1px solid #ccc !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        font-size: 14px !important;
        line-height: normal !important;
        color: #000 !important;
        z-index: 2147483647 !important;
        display: flex !important;
        flex-direction: column !important;
        resize: both !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      
      #bookmarklet-agent .agent-header {
        background: #f8f9fa !important;
        padding: 12px 16px !important;
        border-bottom: 1px solid #e9ecef !important;
        border-radius: 8px 8px 0 0 !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 8px !important;
        cursor: move !important;
        user-select: none !important;
        margin: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .token-usage {
        flex: 1 !important;
        text-align: center !important;
        font-size: 10px !important;
        color: #666 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        cursor: help !important;
        pointer-events: auto !important;
        position: relative !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .token-tooltip {
        position: absolute !important;
        bottom: 100% !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        background: #333 !important;
        color: white !important;
        padding: 8px 12px !important;
        border-radius: 4px !important;
        font-size: 11px !important;
        white-space: pre-line !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transition: opacity 0.2s !important;
        margin-bottom: 5px !important;
        max-width: 300px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        line-height: 1.3 !important;
      }
      
      #bookmarklet-agent .token-usage:hover .token-tooltip {
        opacity: 1 !important;
      }
      
      #bookmarklet-agent .agent-header h3 {
        margin: 0 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        color: #000 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        line-height: normal !important;
        padding: 0 !important;
      }
      
      #bookmarklet-agent .close-btn {
        background: none !important;
        border: none !important;
        font-size: 20px !important;
        cursor: pointer !important;
        padding: 0 !important;
        width: 24px !important;
        height: 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #000 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        margin: 0 !important;
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
    `,document.head.appendChild(t)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0)}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1)}toggle(){this.isVisible?this.hide():this.show()}get eval_results(){return this._eval_results}calculateCost(t,e){let i=this.modelPricing[e];if(!i)return 0;let s=t.input_tokens/1e6*i.input,n=t.output_tokens/1e6*i.output,a=(t.cache_creation_input_tokens||0)/1e6*i.cache_write,o=(t.cache_read_input_tokens||0)/1e6*i.cache_read;return s+n+a+o}updateTokenUsage(t){this.totalTokenUsage.input_tokens+=t.input_tokens,this.totalTokenUsage.output_tokens+=t.output_tokens,this.totalTokenUsage.cache_creation_input_tokens+=t.cache_creation_input_tokens||0,this.totalTokenUsage.cache_read_input_tokens+=t.cache_read_input_tokens||0}formatCost(t){return t<.01?`$${(t*100).toFixed(4)}\xA2`:`$${t.toFixed(4)}`}updateTokenDisplay(){let t=document.getElementById("token-usage"),e=document.getElementById("token-tooltip");if(!t||!e)return;let i=this.calculateCost(this.totalTokenUsage,this.selectedModel),s=this.totalTokenUsage.input_tokens+this.totalTokenUsage.output_tokens;if(s===0){t.childNodes[0].textContent="",e.textContent="";return}let n=t.childNodes[0];n?n.textContent=`Tokens: ${s.toLocaleString()} | Cost: ${this.formatCost(i)}`:t.insertBefore(document.createTextNode(`Tokens: ${s.toLocaleString()} | Cost: ${this.formatCost(i)}`),e);let a=this.modelPricing[this.selectedModel];if(a){let o=[`Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} \xD7 $${a.input}/M = ${this.formatCost(this.totalTokenUsage.input_tokens/1e6*a.input)}`,`Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} \xD7 $${a.output}/M = ${this.formatCost(this.totalTokenUsage.output_tokens/1e6*a.output)}`];this.totalTokenUsage.cache_creation_input_tokens&&o.push(`Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} \xD7 $${a.cache_write}/M = ${this.formatCost(this.totalTokenUsage.cache_creation_input_tokens/1e6*a.cache_write)}`),this.totalTokenUsage.cache_read_input_tokens&&o.push(`Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} \xD7 $${a.cache_read}/M = ${this.formatCost(this.totalTokenUsage.cache_read_input_tokens/1e6*a.cache_read)}`),e.textContent=o.join(`
`)}}handleUnauthorized(){this.apiKey="",this.hasEmbeddedApiKey||localStorage.removeItem("bookmarklet-agent-api-key");let t=document.querySelector(".api-key-section");t&&(t.style.display="block");let e=document.getElementById("api-key-input");e&&(e.value="")}saveApiKey(t=!1){let e=document.getElementById("api-key-input");if(this.apiKey=e.value.trim(),t&&!this.hasEmbeddedApiKey&&localStorage.setItem("bookmarklet-agent-api-key",this.apiKey),this.apiKey){let i=document.querySelector(".api-key-section");i&&(i.style.display="none")}}changeModel(){let t=document.getElementById("model-select");this.selectedModel=t.value,localStorage.setItem("bookmarklet-agent-model",this.selectedModel)}showThinking(){this.hideThinking();let t=document.getElementById("chat-messages");if(!t)return;let e=document.createElement("div");e.id="thinking-indicator",e.className="thinking",e.innerHTML=`
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}hideThinking(){let t=document.getElementById("thinking-indicator");t&&t.remove()}async sendMessage(){let t=document.getElementById("user-input"),e=t.value.trim();if(e){if(!this.apiKey){alert("Please enter your Anthropic API key first");return}t.value="",this.addMessage("user",e),this.showThinking();try{await this.runAgentLoop(e)}catch(i){this.addMessage("assistant",`Error: ${i.message}`)}finally{this.hideThinking()}}}async runAgentLoop(t){let e=this.getPageContext(),i=[...this.conversation.filter(s=>s.role!=="system"),{role:"user",content:t}];for(;;){let s=await this.callAnthropicAPIWithMessages(i,e),n="",a=[];for(let l of s.content)l.type==="text"?n+=l.text:l.type==="tool_use"&&a.push({id:l.id,name:l.name,input:l.input});if(i.push({role:"assistant",content:s.content}),n.trim()&&this.addMessage("assistant",n),a.length===0)break;let o=[];for(let l of a){let c=await this.handleToolCall(l);o.push({type:"tool_result",tool_use_id:c.tool_use_id,content:c.content,is_error:c.is_error});let u=`\u{1F527} **${l.name}**
\`\`\`javascript
${JSON.stringify(l.input,null,2)}
\`\`\``,f=c.is_error?`\u274C **Error:**
${c.content}`:`\u2705 **Result:**
${c.content}`,m=`${u}

${f}`;this.addMessage("assistant",m,!0)}i.push({role:"user",content:o})}this.conversation=i.map(s=>({role:s.role,content:typeof s.content=="string"?s.content:JSON.stringify(s.content)}))}addMessage(t,e,i=!1){let s=document.getElementById("chat-messages");if(!s)return;let n=document.createElement("div");if(n.className=`message ${t}`,i){let a=e.split(`
`),o=a.slice(0,2).join(`
`),l=a.length>2;n.innerHTML=`
        <div class="tool-result-preview">${this.escapeHtml(o)}</div>
        ${l?`
          <div class="tool-result-full" style="display: none;">${this.escapeHtml(e)}</div>
          <button class="expand-tool-result" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">\u{1F4CB} Show Full Result</button>
        `:""}
      `}else if(t==="assistant"){let a=this.renderMarkdown(e);n.innerHTML=a}else n.textContent=e;s.appendChild(n),s.scrollTop=s.scrollHeight,this.conversation.push({role:t,content:e})}escapeHtml(t){let e=document.createElement("div");return e.textContent=t,e.innerHTML}getPageContext(){return{url:window.location.href,title:document.title,selectedText:window.getSelection()?.toString()||"",forms:Array.from(document.forms).map(t=>({action:t.action,method:t.method,elements:Array.from(t.elements).map(e=>{let i=e;return{name:i.name,type:i.type,value:i.value}})})),headings:Array.from(document.querySelectorAll("h1, h2, h3")).map(t=>t.textContent?.trim()||"").slice(0,10),links:Array.from(document.querySelectorAll("a[href]")).map(t=>({text:t.textContent?.trim()||"",href:t.href})).slice(0,20)}}async callAnthropicAPIWithMessages(t,e){let i=[{name:"eval_js",description:"Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",input_schema:{type:"object",properties:{code:{type:"string",description:"JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions."}},required:["code"]}}],s=`You are a helpful web agent that can analyze and interact with web pages using tools.
    
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

Be concise and helpful. Always use the eval_js tool when the user asks you to interact with the page.`;try{let n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.selectedModel,max_tokens:1e3,system:[{type:"text",text:s,cache_control:{type:"ephemeral"}}],tools:i,messages:t.map((o,l)=>l===t.length-1&&o.role==="user"?{...o,content:typeof o.content=="string"?[{type:"text",text:o.content,cache_control:{type:"ephemeral"}}]:Array.isArray(o.content)?o.content.map((c,u)=>u===o.content.length-1?{...c,cache_control:{type:"ephemeral"}}:c):o.content}:o)})});if(!n.ok)throw n.status===401?(this.handleUnauthorized(),new Error("Invalid API key. Please enter a valid Anthropic API key.")):new Error(`API request failed: ${n.status}`);let a=await n.json();if(a.usage){this.updateTokenUsage(a.usage),this.updateTokenDisplay();let o=this.calculateCost(a.usage,this.selectedModel);console.log(`Request cost: ${this.formatCost(o)}, Total cost: ${this.formatCost(this.calculateCost(this.totalTokenUsage,this.selectedModel))}`)}return a}catch(n){throw n instanceof TypeError&&n.message.includes("fetch")?new Error(`CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`):n}}async handleToolCall(toolCall){try{switch(toolCall.name){case"eval_js":let code=toolCall.input.code,result=eval(code),resultString=String(result||"Code executed successfully"),maxLength=10*1024;if(resultString.length>maxLength){let t=this._eval_results.length;this._eval_results.push(result);let e=resultString.substring(0,maxLength);return{tool_use_id:toolCall.id,content:`${e}...

[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${t}]]`}}return{tool_use_id:toolCall.id,content:resultString};default:return{tool_use_id:toolCall.id,content:`Unknown tool: ${toolCall.name}`,is_error:!0}}}catch(t){return{tool_use_id:toolCall.id,content:`Error: ${t.message}`,is_error:!0}}}};window.bookmarkletAgent=new yt(window.BOOKMARKLET_API_KEY);})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE *)
*/
