"use strict";(()=>{function rt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ee=rt();function Vt(t){ee=t}var ge={exec:()=>null};function x(t,e=""){let i=typeof t=="string"?t:t.source,r={replace:(n,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(C.caret,"$1"),i=i.replace(n,a),r},getRegex:()=>new RegExp(i,e)};return r}var C={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Un=/^(?:[ \t]*(?:\n|$))+/,Bn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fe=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ot=/(?:[*+-]|\d{1,9}[.)])/,Qt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jt=x(Qt).replace(/bull/g,ot).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gn=x(Qt).replace(/bull/g,ot).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),at=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Wn=/^[^\n]+/,st=/(?!\s*\])(?:\\.|[^\[\]\\])+/,qn=x(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",st).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jn=x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ot).getRegex(),Ne="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yn=x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",Ne).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),en=x(at).replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Kn=x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",en).getRegex(),ct={blockquote:Kn,code:Bn,def:qn,fences:Fn,heading:Hn,hr:fe,html:Yn,lheading:Jt,list:jn,newline:Un,paragraph:en,table:ge,text:Wn},jt=x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Zn={...ct,lheading:Gn,table:jt,paragraph:x(at).replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",jt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex()},Xn={...ct,html:x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ge,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:x(at).replace("hr",fe).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vn=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tn=/^( {2,}|\\)\n(?!\s*$)/,Jn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$e=/[\p{P}\p{S}]/u,pt=/[\s\p{P}\p{S}]/u,nn=/[^\s\p{P}\p{S}]/u,ei=x(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,pt).getRegex(),rn=/(?!~)[\p{P}\p{S}]/u,ti=/(?!~)[\s\p{P}\p{S}]/u,ni=/(?:[^\s\p{P}\p{S}]|~)/u,ii=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,on=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ri=x(on,"u").replace(/punct/g,$e).getRegex(),oi=x(on,"u").replace(/punct/g,rn).getRegex(),an="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ai=x(an,"gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),si=x(an,"gu").replace(/notPunctSpace/g,ni).replace(/punctSpace/g,ti).replace(/punct/g,rn).getRegex(),li=x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),ci=x(/\\(punct)/,"gu").replace(/punct/g,$e).getRegex(),pi=x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ui=x(lt).replace("(?:-->|$)","-->").getRegex(),hi=x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ui).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Oe=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,mi=x(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Oe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),sn=x(/^!?\[(label)\]\[(ref)\]/).replace("label",Oe).replace("ref",st).getRegex(),ln=x(/^!?\[(ref)\](?:\[\])?/).replace("ref",st).getRegex(),di=x("reflink|nolink(?!\\()","g").replace("reflink",sn).replace("nolink",ln).getRegex(),ut={_backpedal:ge,anyPunctuation:ci,autolink:pi,blockSkip:ii,br:tn,code:Qn,del:ge,emStrongLDelim:ri,emStrongRDelimAst:ai,emStrongRDelimUnd:li,escape:Vn,link:mi,nolink:ln,punctuation:ei,reflink:sn,reflinkSearch:di,tag:hi,text:Jn,url:ge},gi={...ut,link:x(/^!?\[(label)\]\((.*?)\)/).replace("label",Oe).getRegex(),reflink:x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Oe).getRegex()},tt={...ut,emStrongRDelimAst:si,emStrongLDelim:oi,url:x(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},fi={...tt,br:x(tn).replace("{2,}","*").getRegex(),text:x(tt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Me={normal:ct,gfm:Zn,pedantic:Xn},me={normal:ut,gfm:tt,breaks:fi,pedantic:gi},ki={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yt=t=>ki[t];function F(t,e){if(e){if(C.escapeTest.test(t))return t.replace(C.escapeReplace,Yt)}else if(C.escapeTestNoEncode.test(t))return t.replace(C.escapeReplaceNoEncode,Yt);return t}function Kt(t){try{t=encodeURI(t).replace(C.percentDecode,"%")}catch{return null}return t}function Zt(t,e){let i=t.replace(C.findPipe,(s,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),r=i.split(C.splitPipe),n=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;n<r.length;n++)r[n]=r[n].trim().replace(C.slashPipe,"|");return r}function de(t,e,i){let r=t.length;if(r===0)return"";let n=0;for(;n<r;){let s=t.charAt(r-n-1);if(s===e&&!i)n++;else if(s!==e&&i)n++;else break}return t.slice(0,r-n)}function bi(t,e){if(t.indexOf(e[1])===-1)return-1;let i=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])i++;else if(t[r]===e[1]&&(i--,i<0))return r;return i>0?-2:-1}function Xt(t,e,i,r,n){let s=e.href,a=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:i,href:s,title:a,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,c}function xi(t,e,i){let r=t.match(i.other.indentCodeCompensation);if(r===null)return e;let n=r[1];return e.split(`
`).map(s=>{let a=s.match(i.other.beginningSpace);if(a===null)return s;let[l]=a;return l.length>=n.length?s.slice(n.length):s}).join(`
`)}var De=class{options;rules;lexer;constructor(t){this.options=t||ee}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let i=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?i:de(i,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let i=e[0],r=xi(i,e[3]||"",this.rules);return{type:"code",raw:i,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let i=e[2].trim();if(this.rules.other.endingHash.test(i)){let r=de(i,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(i=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:de(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let i=de(e[0],`
`).split(`
`),r="",n="",s=[];for(;i.length>0;){let a=!1,l=[],c;for(c=0;c<i.length;c++)if(this.rules.other.blockquoteStart.test(i[c]))l.push(i[c]),a=!0;else if(!a)l.push(i[c]);else break;i=i.slice(c);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,n=n?`${n}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=g,i.length===0)break;let k=s.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let w=k,y=w.raw+`
`+i.join(`
`),N=this.blockquote(y);s[s.length-1]=N,r=r.substring(0,r.length-w.raw.length)+N.raw,n=n.substring(0,n.length-w.text.length)+N.text;break}else if(k?.type==="list"){let w=k,y=w.raw+`
`+i.join(`
`),N=this.list(y);s[s.length-1]=N,r=r.substring(0,r.length-k.raw.length)+N.raw,n=n.substring(0,n.length-w.raw.length)+N.raw,i=y.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let i=e[1].trim(),r=i.length>1,n={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let s=this.rules.other.listItemRegex(i),a=!1;for(;t;){let c=!1,u="",d="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,le=>" ".repeat(3*le.length)),k=t.split(`
`,1)[0],w=!g.trim(),y=0;if(this.options.pedantic?(y=2,d=g.trimStart()):w?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=g.slice(y),y+=e[1].length),w&&this.rules.other.blankLine.test(k)&&(u+=k+`
`,t=t.substring(k.length+1),c=!0),!c){let le=this.rules.other.nextBulletRegex(y),we=this.rules.other.hrRegex(y),K=this.rules.other.fencesBeginRegex(y),S=this.rules.other.headingBeginRegex(y),Z=this.rules.other.htmlBeginRegex(y);for(;t;){let X=t.split(`
`,1)[0],V;if(k=X,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),V=k):V=k.replace(this.rules.other.tabCharGlobal,"    "),K.test(k)||S.test(k)||Z.test(k)||le.test(k)||we.test(k))break;if(V.search(this.rules.other.nonSpaceChar)>=y||!k.trim())d+=`
`+V.slice(y);else{if(w||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(g)||S.test(g)||we.test(g))break;d+=`
`+k}!w&&!k.trim()&&(w=!0),u+=X+`
`,t=t.substring(X.length+1),g=V.slice(y)}}n.loose||(a?n.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0));let N=null,_e;this.options.gfm&&(N=this.rules.other.listIsTask.exec(d),N&&(_e=N[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:u,task:!!N,checked:_e,loose:!1,text:d,tokens:[]}),n.raw+=u}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c=0;c<n.items.length;c++)if(this.lexer.state.top=!1,n.items[c].tokens=this.lexer.blockTokens(n.items[c].text,[]),!n.loose){let u=n.items[c].tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));n.loose=d}if(n.loose)for(let c=0;c<n.items.length;c++)n.items[c].loose=!0;return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let i=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:i,raw:e[0],href:r,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let i=Zt(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(i.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<i.length;a++)s.header.push({text:i[a],tokens:this.lexer.inline(i[a]),header:!0,align:s.align[a]});for(let a of n)s.rows.push(Zt(a,s.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[c]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let i=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:i,tokens:this.lexer.inline(i)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let i=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(i)){if(!this.rules.other.endAngleBracket.test(i))return;let s=de(i.slice(0,-1),"\\");if((i.length-s.length)%2===0)return}else{let s=bi(e[2],"()");if(s===-2)return;if(s>-1){let a=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,a).trim(),e[3]=""}}let r=e[2],n="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],n=s[3])}else n=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(i)?r=r.slice(1):r=r.slice(1,-1)),Xt(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let i;if((i=this.rules.inline.reflink.exec(t))||(i=this.rules.inline.nolink.exec(t))){let r=(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[r.toLowerCase()];if(!n){let s=i[0].charAt(0);return{type:"text",raw:s,text:s}}return Xt(i,n,i[0],this.lexer,this.rules)}}emStrong(t,e,i=""){let r=this.rules.inline.emStrongLDelim.exec(t);if(!(!r||r[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!i||this.rules.inline.punctuation.exec(i))){let n=[...r[0]].length-1,s,a,l=n,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+n);(r=u.exec(e))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(a=[...s].length,r[3]||r[4]){l+=a;continue}else if((r[5]||r[6])&&n%3&&!((n+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...r[0]][0].length,g=t.slice(0,n+r.index+d+a);if(Math.min(n,a)%2){let w=g.slice(1,-1);return{type:"em",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}let k=g.slice(2,-2);return{type:"strong",raw:g,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let i=e[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(i),n=this.rules.other.startingSpaceChar.test(i)&&this.rules.other.endingSpaceChar.test(i);return r&&n&&(i=i.substring(1,i.length-1)),{type:"codespan",raw:e[0],text:i}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let i,r;return e[2]==="@"?(i=e[1],r="mailto:"+i):(i=e[1],r=i),{type:"link",raw:e[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let i,r;if(e[2]==="@")i=e[0],r="mailto:"+i;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);i=e[0],e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let i=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:i}}}},q=class nt{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ee,this.options.tokenizer=this.options.tokenizer||new De,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let i={other:C,block:Me.normal,inline:me.normal};this.options.pedantic?(i.block=Me.pedantic,i.inline=me.pedantic):this.options.gfm&&(i.block=Me.gfm,this.options.breaks?i.inline=me.breaks:i.inline=me.gfm),this.tokenizer.rules=i}static get rules(){return{block:Me,inline:me}}static lex(e,i){return new nt(i).lex(e)}static lexInline(e,i){return new nt(i).inlineTokens(e)}lex(e){e=e.replace(C.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let i=0;i<this.inlineQueue.length;i++){let r=this.inlineQueue[i];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,i=[],r=!1){for(this.options.pedantic&&(e=e.replace(C.tabCharGlobal,"    ").replace(C.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(a=>(n=a.call({lexer:this},e,i))?(e=e.substring(n.raw.length),i.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let a=i.at(-1);n.raw.length===1&&a!==void 0?a.raw+=`
`:i.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let a=i.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.at(-1).src=a.text):i.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let a=i.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),i.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),i.push(n);continue}let s=e;if(this.options.extensions?.startBlock){let a=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(n=this.tokenizer.paragraph(s))){let a=i.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):i.push(n),r=s.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let a=i.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):i.push(n);continue}if(e){let a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,i}inline(e,i=[]){return this.inlineQueue.push({src:e,tokens:i}),i}inlineTokens(e,i=[]){let r=e,n=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,n.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(n=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let s=!1,a="";for(;e;){s||(a=""),s=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},e,i))?(e=e.substring(l.raw.length),i.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let u=i.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):i.push(l);continue}if(l=this.tokenizer.emStrong(e,r,a)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),i.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),i.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),i.push(l);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,d=e.slice(1),g;this.options.extensions.startInline.forEach(k=>{g=k.call({lexer:this},d),typeof g=="number"&&g>=0&&(u=Math.min(u,g))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),s=!0;let u=i.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):i.push(l);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return i}},Pe=class{options;parser;constructor(t){this.options=t||ee}space(t){return""}code({text:t,lang:e,escaped:i}){let r=(e||"").match(C.notSpaceStart)?.[0],n=t.replace(C.endingNewline,"")+`
`;return r?'<pre><code class="language-'+F(r)+'">'+(i?n:F(n,!0))+`</code></pre>
`:"<pre><code>"+(i?n:F(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,i=t.start,r="";for(let a=0;a<t.items.length;a++){let l=t.items[a];r+=this.listitem(l)}let n=e?"ol":"ul",s=e&&i!==1?' start="'+i+'"':"";return"<"+n+s+`>
`+r+"</"+n+`>
`}listitem(t){let e="";if(t.task){let i=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=i+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=i+" "+F(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):e+=i+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",i="";for(let n=0;n<t.header.length;n++)i+=this.tablecell(t.header[n]);e+=this.tablerow({text:i});let r="";for(let n=0;n<t.rows.length;n++){let s=t.rows[n];i="";for(let a=0;a<s.length;a++)i+=this.tablecell(s[a]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${F(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:i}){let r=this.parser.parseInline(i),n=Kt(t);if(n===null)return r;t=n;let s='<a href="'+t+'"';return e&&(s+=' title="'+F(e)+'"'),s+=">"+r+"</a>",s}image({href:t,title:e,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let n=Kt(t);if(n===null)return F(i);t=n;let s=`<img src="${t}" alt="${i}"`;return e&&(s+=` title="${F(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:F(t.text)}},ht=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},j=class it{options;renderer;textRenderer;constructor(e){this.options=e||ee,this.options.renderer=this.options.renderer||new Pe,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ht}static parse(e,i){return new it(i).parse(e)}static parseInline(e,i){return new it(i).parseInline(e)}parse(e,i=!0){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let l=s,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){r+=c||"";continue}}let a=s;switch(a.type){case"space":{r+=this.renderer.space(a);continue}case"hr":{r+=this.renderer.hr(a);continue}case"heading":{r+=this.renderer.heading(a);continue}case"code":{r+=this.renderer.code(a);continue}case"table":{r+=this.renderer.table(a);continue}case"blockquote":{r+=this.renderer.blockquote(a);continue}case"list":{r+=this.renderer.list(a);continue}case"html":{r+=this.renderer.html(a);continue}case"paragraph":{r+=this.renderer.paragraph(a);continue}case"text":{let l=a,c=this.renderer.text(l);for(;n+1<e.length&&e[n+1].type==="text";)l=e[++n],c+=`
`+this.renderer.text(l);i?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}parseInline(e,i=this.renderer){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let a=s;switch(a.type){case"escape":{r+=i.text(a);break}case"html":{r+=i.html(a);break}case"link":{r+=i.link(a);break}case"image":{r+=i.image(a);break}case"strong":{r+=i.strong(a);break}case"em":{r+=i.em(a);break}case"codespan":{r+=i.codespan(a);break}case"br":{r+=i.br(a);break}case"del":{r+=i.del(a);break}case"text":{r+=i.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ce=class{options;block;constructor(t){this.options=t||ee}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?q.lex:q.lexInline}provideParser(){return this.block?j.parse:j.parseInline}},yi=class{defaults=rt();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=j;Renderer=Pe;TextRenderer=ht;Lexer=q;Tokenizer=De;Hooks=Ce;constructor(...t){this.use(...t)}walkTokens(t,e){let i=[];for(let r of t)switch(i=i.concat(e.call(this,r)),r.type){case"table":{let n=r;for(let s of n.header)i=i.concat(this.walkTokens(s.tokens,e));for(let s of n.rows)for(let a of s)i=i.concat(this.walkTokens(a.tokens,e));break}case"list":{let n=r;i=i.concat(this.walkTokens(n.items,e));break}default:{let n=r;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(s=>{let a=n[s].flat(1/0);i=i.concat(this.walkTokens(a,e))}):n.tokens&&(i=i.concat(this.walkTokens(n.tokens,e)))}}return i}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(i=>{let r={...i};if(r.async=this.defaults.async||r.async||!1,i.extensions&&(i.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let s=e.renderers[n.name];s?e.renderers[n.name]=function(...a){let l=n.renderer.apply(this,a);return l===!1&&(l=s.apply(this,a)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[n.level];s?s.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),r.extensions=e),i.renderer){let n=this.defaults.renderer||new Pe(this.defaults);for(let s in i.renderer){if(!(s in n))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,l=i.renderer[a],c=n[a];n[a]=(...u)=>{let d=l.apply(n,u);return d===!1&&(d=c.apply(n,u)),d||""}}r.renderer=n}if(i.tokenizer){let n=this.defaults.tokenizer||new De(this.defaults);for(let s in i.tokenizer){if(!(s in n))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,l=i.tokenizer[a],c=n[a];n[a]=(...u)=>{let d=l.apply(n,u);return d===!1&&(d=c.apply(n,u)),d}}r.tokenizer=n}if(i.hooks){let n=this.defaults.hooks||new Ce;for(let s in i.hooks){if(!(s in n))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,l=i.hooks[a],c=n[a];Ce.passThroughHooks.has(s)?n[a]=u=>{if(this.defaults.async)return Promise.resolve(l.call(n,u)).then(g=>c.call(n,g));let d=l.call(n,u);return c.call(n,d)}:n[a]=(...u)=>{let d=l.apply(n,u);return d===!1&&(d=c.apply(n,u)),d}}r.hooks=n}if(i.walkTokens){let n=this.defaults.walkTokens,s=i.walkTokens;r.walkTokens=function(a){let l=[];return l.push(s.call(this,a)),n&&(l=l.concat(n.call(this,a))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return q.lex(t,e??this.defaults)}parser(t,e){return j.parse(t,e??this.defaults)}parseMarkdown(t){return(e,i)=>{let r={...i},n={...this.defaults,...r},s=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));n.hooks&&(n.hooks.options=n,n.hooks.block=t);let a=n.hooks?n.hooks.provideLexer():t?q.lex:q.lexInline,l=n.hooks?n.hooks.provideParser():t?j.parse:j.parseInline;if(n.async)return Promise.resolve(n.hooks?n.hooks.preprocess(e):e).then(c=>a(c,n)).then(c=>n.hooks?n.hooks.processAllTokens(c):c).then(c=>n.walkTokens?Promise.all(this.walkTokens(c,n.walkTokens)).then(()=>c):c).then(c=>l(c,n)).then(c=>n.hooks?n.hooks.postprocess(c):c).catch(s);try{n.hooks&&(e=n.hooks.preprocess(e));let c=a(e,n);n.hooks&&(c=n.hooks.processAllTokens(c)),n.walkTokens&&this.walkTokens(c,n.walkTokens);let u=l(c,n);return n.hooks&&(u=n.hooks.postprocess(u)),u}catch(c){return s(c)}}}onError(t,e){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let r="<p>An error occurred:</p><pre>"+F(i.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(i);throw i}}},J=new yi;function b(t,e){return J.parse(t,e)}b.options=b.setOptions=function(t){return J.setOptions(t),b.defaults=J.defaults,Vt(b.defaults),b};b.getDefaults=rt;b.defaults=ee;b.use=function(...t){return J.use(...t),b.defaults=J.defaults,Vt(b.defaults),b};b.walkTokens=function(t,e){return J.walkTokens(t,e)};b.parseInline=J.parseInline;b.Parser=j;b.parser=j.parse;b.Renderer=Pe;b.TextRenderer=ht;b.Lexer=q;b.lexer=q.lex;b.Tokenizer=De;b.Hooks=Ce;b.parse=b;var Hi=b.options,Gi=b.setOptions,Wi=b.use,qi=b.walkTokens,ji=b.parseInline;var Yi=j.parse,Ki=q.lex;var{entries:bn,setPrototypeOf:cn,isFrozen:Ti,getPrototypeOf:_i,getOwnPropertyDescriptor:wi}=Object,{freeze:D,seal:z,create:xn}=Object,{apply:bt,construct:xt}=typeof Reflect<"u"&&Reflect;D||(D=function(e){return e});z||(z=function(e){return e});bt||(bt=function(e,i,r){return e.apply(i,r)});xt||(xt=function(e,i){return new e(...i)});var ze=P(Array.prototype.forEach),Ei=P(Array.prototype.lastIndexOf),pn=P(Array.prototype.pop),ke=P(Array.prototype.push),Si=P(Array.prototype.splice),Be=P(String.prototype.toLowerCase),mt=P(String.prototype.toString),un=P(String.prototype.match),be=P(String.prototype.replace),Ai=P(String.prototype.indexOf),vi=P(String.prototype.trim),U=P(Object.prototype.hasOwnProperty),O=P(RegExp.prototype.test),xe=Ri(TypeError);function P(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var i=arguments.length,r=new Array(i>1?i-1:0),n=1;n<i;n++)r[n-1]=arguments[n];return bt(t,e,r)}}function Ri(t){return function(){for(var e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return xt(t,i)}}function f(t,e){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Be;cn&&cn(t,null);let r=e.length;for(;r--;){let n=e[r];if(typeof n=="string"){let s=i(n);s!==n&&(Ti(e)||(e[r]=s),n=s)}t[n]=!0}return t}function Li(t){for(let e=0;e<t.length;e++)U(t,e)||(t[e]=null);return t}function Y(t){let e=xn(null);for(let[i,r]of bn(t))U(t,i)&&(Array.isArray(r)?e[i]=Li(r):r&&typeof r=="object"&&r.constructor===Object?e[i]=Y(r):e[i]=r);return e}function ye(t,e){for(;t!==null;){let r=wi(t,e);if(r){if(r.get)return P(r.get);if(typeof r.value=="function")return P(r.value)}t=_i(t)}function i(){return null}return i}var hn=D(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dt=D(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gt=D(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ii=D(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ft=D(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mi=D(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),mn=D(["#text"]),dn=D(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),kt=D(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gn=D(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ue=D(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ci=z(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Oi=z(/<%[\w\W]*|[\w\W]*%>/gm),Di=z(/\$\{[\w\W]*/gm),Pi=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ni=z(/^aria-[\-\w]+$/),yn=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$i=z(/^(?:\w+script|data):/i),zi=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tn=z(/^html$/i),Ui=z(/^[a-z][.\w]*(-[.\w]+)+$/i),fn=Object.freeze({__proto__:null,ARIA_ATTR:Ni,ATTR_WHITESPACE:zi,CUSTOM_ELEMENT:Ui,DATA_ATTR:Pi,DOCTYPE_NAME:Tn,ERB_EXPR:Oi,IS_ALLOWED_URI:yn,IS_SCRIPT_OR_DATA:$i,MUSTACHE_EXPR:Ci,TMPLIT_EXPR:Di}),Te={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Bi=function(){return typeof window>"u"?null:window},Fi=function(e,i){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null,n="data-tt-policy-suffix";i&&i.hasAttribute(n)&&(r=i.getAttribute(n));let s="dompurify"+(r?"#"+r:"");try{return e.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},kn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function _n(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bi(),e=m=>_n(m);if(e.version="3.2.6",e.removed=[],!t||!t.document||t.document.nodeType!==Te.document||!t.Element)return e.isSupported=!1,e;let{document:i}=t,r=i,n=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:k,trustedTypes:w}=t,y=c.prototype,N=ye(y,"cloneNode"),_e=ye(y,"remove"),le=ye(y,"nextSibling"),we=ye(y,"childNodes"),K=ye(y,"parentNode");if(typeof a=="function"){let m=i.createElement("template");m.content&&m.content.ownerDocument&&(i=m.content.ownerDocument)}let S,Z="",{implementation:X,createNodeIterator:V,createDocumentFragment:En,getElementsByTagName:Sn}=i,{importNode:An}=r,M=kn();e.isSupported=typeof bn=="function"&&typeof K=="function"&&X&&X.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Fe,ERB_EXPR:He,TMPLIT_EXPR:Ge,DATA_ATTR:vn,ARIA_ATTR:Rn,IS_SCRIPT_OR_DATA:Ln,ATTR_WHITESPACE:Tt,CUSTOM_ELEMENT:In}=fn,{IS_ALLOWED_URI:_t}=fn,A=null,wt=f({},[...hn,...dt,...gt,...ft,...mn]),R=null,Et=f({},[...dn,...kt,...gn,...Ue]),_=Object.seal(xn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ce=null,We=null,St=!0,qe=!0,At=!1,vt=!0,te=!1,Ee=!0,Q=!1,je=!1,Ye=!1,ne=!1,Se=!1,Ae=!1,Rt=!0,Lt=!1,Mn="user-content-",Ke=!0,pe=!1,ie={},re=null,It=f({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Mt=null,Ct=f({},["audio","video","img","source","image","track"]),Ze=null,Ot=f({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ve="http://www.w3.org/1998/Math/MathML",Re="http://www.w3.org/2000/svg",H="http://www.w3.org/1999/xhtml",oe=H,Xe=!1,Ve=null,Cn=f({},[ve,Re,H],mt),Le=f({},["mi","mo","mn","ms","mtext"]),Ie=f({},["annotation-xml"]),On=f({},["title","style","font","a","script"]),ue=null,Dn=["application/xhtml+xml","text/html"],Pn="text/html",v=null,ae=null,Nn=i.createElement("form"),Dt=function(o){return o instanceof RegExp||o instanceof Function},Qe=function(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===o)){if((!o||typeof o!="object")&&(o={}),o=Y(o),ue=Dn.indexOf(o.PARSER_MEDIA_TYPE)===-1?Pn:o.PARSER_MEDIA_TYPE,v=ue==="application/xhtml+xml"?mt:Be,A=U(o,"ALLOWED_TAGS")?f({},o.ALLOWED_TAGS,v):wt,R=U(o,"ALLOWED_ATTR")?f({},o.ALLOWED_ATTR,v):Et,Ve=U(o,"ALLOWED_NAMESPACES")?f({},o.ALLOWED_NAMESPACES,mt):Cn,Ze=U(o,"ADD_URI_SAFE_ATTR")?f(Y(Ot),o.ADD_URI_SAFE_ATTR,v):Ot,Mt=U(o,"ADD_DATA_URI_TAGS")?f(Y(Ct),o.ADD_DATA_URI_TAGS,v):Ct,re=U(o,"FORBID_CONTENTS")?f({},o.FORBID_CONTENTS,v):It,ce=U(o,"FORBID_TAGS")?f({},o.FORBID_TAGS,v):Y({}),We=U(o,"FORBID_ATTR")?f({},o.FORBID_ATTR,v):Y({}),ie=U(o,"USE_PROFILES")?o.USE_PROFILES:!1,St=o.ALLOW_ARIA_ATTR!==!1,qe=o.ALLOW_DATA_ATTR!==!1,At=o.ALLOW_UNKNOWN_PROTOCOLS||!1,vt=o.ALLOW_SELF_CLOSE_IN_ATTR!==!1,te=o.SAFE_FOR_TEMPLATES||!1,Ee=o.SAFE_FOR_XML!==!1,Q=o.WHOLE_DOCUMENT||!1,ne=o.RETURN_DOM||!1,Se=o.RETURN_DOM_FRAGMENT||!1,Ae=o.RETURN_TRUSTED_TYPE||!1,Ye=o.FORCE_BODY||!1,Rt=o.SANITIZE_DOM!==!1,Lt=o.SANITIZE_NAMED_PROPS||!1,Ke=o.KEEP_CONTENT!==!1,pe=o.IN_PLACE||!1,_t=o.ALLOWED_URI_REGEXP||yn,oe=o.NAMESPACE||H,Le=o.MATHML_TEXT_INTEGRATION_POINTS||Le,Ie=o.HTML_INTEGRATION_POINTS||Ie,_=o.CUSTOM_ELEMENT_HANDLING||{},o.CUSTOM_ELEMENT_HANDLING&&Dt(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_.tagNameCheck=o.CUSTOM_ELEMENT_HANDLING.tagNameCheck),o.CUSTOM_ELEMENT_HANDLING&&Dt(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_.attributeNameCheck=o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),o.CUSTOM_ELEMENT_HANDLING&&typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_.allowCustomizedBuiltInElements=o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),te&&(qe=!1),Se&&(ne=!0),ie&&(A=f({},mn),R=[],ie.html===!0&&(f(A,hn),f(R,dn)),ie.svg===!0&&(f(A,dt),f(R,kt),f(R,Ue)),ie.svgFilters===!0&&(f(A,gt),f(R,kt),f(R,Ue)),ie.mathMl===!0&&(f(A,ft),f(R,gn),f(R,Ue))),o.ADD_TAGS&&(A===wt&&(A=Y(A)),f(A,o.ADD_TAGS,v)),o.ADD_ATTR&&(R===Et&&(R=Y(R)),f(R,o.ADD_ATTR,v)),o.ADD_URI_SAFE_ATTR&&f(Ze,o.ADD_URI_SAFE_ATTR,v),o.FORBID_CONTENTS&&(re===It&&(re=Y(re)),f(re,o.FORBID_CONTENTS,v)),Ke&&(A["#text"]=!0),Q&&f(A,["html","head","body"]),A.table&&(f(A,["tbody"]),delete ce.tbody),o.TRUSTED_TYPES_POLICY){if(typeof o.TRUSTED_TYPES_POLICY.createHTML!="function")throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof o.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=o.TRUSTED_TYPES_POLICY,Z=S.createHTML("")}else S===void 0&&(S=Fi(w,n)),S!==null&&typeof Z=="string"&&(Z=S.createHTML(""));D&&D(o),ae=o}},Pt=f({},[...dt,...gt,...Ii]),Nt=f({},[...ft,...Mi]),$n=function(o){let p=K(o);(!p||!p.tagName)&&(p={namespaceURI:oe,tagName:"template"});let h=Be(o.tagName),T=Be(p.tagName);return Ve[o.namespaceURI]?o.namespaceURI===Re?p.namespaceURI===H?h==="svg":p.namespaceURI===ve?h==="svg"&&(T==="annotation-xml"||Le[T]):!!Pt[h]:o.namespaceURI===ve?p.namespaceURI===H?h==="math":p.namespaceURI===Re?h==="math"&&Ie[T]:!!Nt[h]:o.namespaceURI===H?p.namespaceURI===Re&&!Ie[T]||p.namespaceURI===ve&&!Le[T]?!1:!Nt[h]&&(On[h]||!Pt[h]):!!(ue==="application/xhtml+xml"&&Ve[o.namespaceURI]):!1},B=function(o){ke(e.removed,{element:o});try{K(o).removeChild(o)}catch{_e(o)}},se=function(o,p){try{ke(e.removed,{attribute:p.getAttributeNode(o),from:p})}catch{ke(e.removed,{attribute:null,from:p})}if(p.removeAttribute(o),o==="is")if(ne||Se)try{B(p)}catch{}else try{p.setAttribute(o,"")}catch{}},$t=function(o){let p=null,h=null;if(Ye)o="<remove></remove>"+o;else{let E=un(o,/^[\r\n\t ]+/);h=E&&E[0]}ue==="application/xhtml+xml"&&oe===H&&(o='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+o+"</body></html>");let T=S?S.createHTML(o):o;if(oe===H)try{p=new k().parseFromString(T,ue)}catch{}if(!p||!p.documentElement){p=X.createDocument(oe,"template",null);try{p.documentElement.innerHTML=Xe?Z:T}catch{}}let L=p.body||p.documentElement;return o&&h&&L.insertBefore(i.createTextNode(h),L.childNodes[0]||null),oe===H?Sn.call(p,Q?"html":"body")[0]:Q?p.documentElement:L},zt=function(o){return V.call(o.ownerDocument||o,o,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Je=function(o){return o instanceof g&&(typeof o.nodeName!="string"||typeof o.textContent!="string"||typeof o.removeChild!="function"||!(o.attributes instanceof d)||typeof o.removeAttribute!="function"||typeof o.setAttribute!="function"||typeof o.namespaceURI!="string"||typeof o.insertBefore!="function"||typeof o.hasChildNodes!="function")},Ut=function(o){return typeof l=="function"&&o instanceof l};function G(m,o,p){ze(m,h=>{h.call(e,o,p,ae)})}let Bt=function(o){let p=null;if(G(M.beforeSanitizeElements,o,null),Je(o))return B(o),!0;let h=v(o.nodeName);if(G(M.uponSanitizeElement,o,{tagName:h,allowedTags:A}),Ee&&o.hasChildNodes()&&!Ut(o.firstElementChild)&&O(/<[/\w!]/g,o.innerHTML)&&O(/<[/\w!]/g,o.textContent)||o.nodeType===Te.progressingInstruction||Ee&&o.nodeType===Te.comment&&O(/<[/\w]/g,o.data))return B(o),!0;if(!A[h]||ce[h]){if(!ce[h]&&Ht(h)&&(_.tagNameCheck instanceof RegExp&&O(_.tagNameCheck,h)||_.tagNameCheck instanceof Function&&_.tagNameCheck(h)))return!1;if(Ke&&!re[h]){let T=K(o)||o.parentNode,L=we(o)||o.childNodes;if(L&&T){let E=L.length;for(let $=E-1;$>=0;--$){let W=N(L[$],!0);W.__removalCount=(o.__removalCount||0)+1,T.insertBefore(W,le(o))}}}return B(o),!0}return o instanceof c&&!$n(o)||(h==="noscript"||h==="noembed"||h==="noframes")&&O(/<\/no(script|embed|frames)/i,o.innerHTML)?(B(o),!0):(te&&o.nodeType===Te.text&&(p=o.textContent,ze([Fe,He,Ge],T=>{p=be(p,T," ")}),o.textContent!==p&&(ke(e.removed,{element:o.cloneNode()}),o.textContent=p)),G(M.afterSanitizeElements,o,null),!1)},Ft=function(o,p,h){if(Rt&&(p==="id"||p==="name")&&(h in i||h in Nn))return!1;if(!(qe&&!We[p]&&O(vn,p))){if(!(St&&O(Rn,p))){if(!R[p]||We[p]){if(!(Ht(o)&&(_.tagNameCheck instanceof RegExp&&O(_.tagNameCheck,o)||_.tagNameCheck instanceof Function&&_.tagNameCheck(o))&&(_.attributeNameCheck instanceof RegExp&&O(_.attributeNameCheck,p)||_.attributeNameCheck instanceof Function&&_.attributeNameCheck(p))||p==="is"&&_.allowCustomizedBuiltInElements&&(_.tagNameCheck instanceof RegExp&&O(_.tagNameCheck,h)||_.tagNameCheck instanceof Function&&_.tagNameCheck(h))))return!1}else if(!Ze[p]){if(!O(_t,be(h,Tt,""))){if(!((p==="src"||p==="xlink:href"||p==="href")&&o!=="script"&&Ai(h,"data:")===0&&Mt[o])){if(!(At&&!O(Ln,be(h,Tt,"")))){if(h)return!1}}}}}}return!0},Ht=function(o){return o!=="annotation-xml"&&un(o,In)},Gt=function(o){G(M.beforeSanitizeAttributes,o,null);let{attributes:p}=o;if(!p||Je(o))return;let h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:R,forceKeepAttr:void 0},T=p.length;for(;T--;){let L=p[T],{name:E,namespaceURI:$,value:W}=L,he=v(E),et=W,I=E==="value"?et:vi(et);if(h.attrName=he,h.attrValue=I,h.keepAttr=!0,h.forceKeepAttr=void 0,G(M.uponSanitizeAttribute,o,h),I=h.attrValue,Lt&&(he==="id"||he==="name")&&(se(E,o),I=Mn+I),Ee&&O(/((--!?|])>)|<\/(style|title)/i,I)){se(E,o);continue}if(h.forceKeepAttr)continue;if(!h.keepAttr){se(E,o);continue}if(!vt&&O(/\/>/i,I)){se(E,o);continue}te&&ze([Fe,He,Ge],qt=>{I=be(I,qt," ")});let Wt=v(o.nodeName);if(!Ft(Wt,he,I)){se(E,o);continue}if(S&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!$)switch(w.getAttributeType(Wt,he)){case"TrustedHTML":{I=S.createHTML(I);break}case"TrustedScriptURL":{I=S.createScriptURL(I);break}}if(I!==et)try{$?o.setAttributeNS($,E,I):o.setAttribute(E,I),Je(o)?B(o):pn(e.removed)}catch{se(E,o)}}G(M.afterSanitizeAttributes,o,null)},zn=function m(o){let p=null,h=zt(o);for(G(M.beforeSanitizeShadowDOM,o,null);p=h.nextNode();)G(M.uponSanitizeShadowNode,p,null),Bt(p),Gt(p),p.content instanceof s&&m(p.content);G(M.afterSanitizeShadowDOM,o,null)};return e.sanitize=function(m){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,h=null,T=null,L=null;if(Xe=!m,Xe&&(m="<!-->"),typeof m!="string"&&!Ut(m))if(typeof m.toString=="function"){if(m=m.toString(),typeof m!="string")throw xe("dirty is not a string, aborting")}else throw xe("toString is not a function");if(!e.isSupported)return m;if(je||Qe(o),e.removed=[],typeof m=="string"&&(pe=!1),pe){if(m.nodeName){let W=v(m.nodeName);if(!A[W]||ce[W])throw xe("root node is forbidden and cannot be sanitized in-place")}}else if(m instanceof l)p=$t("<!---->"),h=p.ownerDocument.importNode(m,!0),h.nodeType===Te.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?p=h:p.appendChild(h);else{if(!ne&&!te&&!Q&&m.indexOf("<")===-1)return S&&Ae?S.createHTML(m):m;if(p=$t(m),!p)return ne?null:Ae?Z:""}p&&Ye&&B(p.firstChild);let E=zt(pe?m:p);for(;T=E.nextNode();)Bt(T),Gt(T),T.content instanceof s&&zn(T.content);if(pe)return m;if(ne){if(Se)for(L=En.call(p.ownerDocument);p.firstChild;)L.appendChild(p.firstChild);else L=p;return(R.shadowroot||R.shadowrootmode)&&(L=An.call(r,L,!0)),L}let $=Q?p.outerHTML:p.innerHTML;return Q&&A["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&O(Tn,p.ownerDocument.doctype.name)&&($="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+$),te&&ze([Fe,He,Ge],W=>{$=be($,W," ")}),S&&Ae?S.createHTML($):$},e.setConfig=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Qe(m),je=!0},e.clearConfig=function(){ae=null,je=!1},e.isValidAttribute=function(m,o,p){ae||Qe({});let h=v(m),T=v(o);return Ft(h,T,p)},e.addHook=function(m,o){typeof o=="function"&&ke(M[m],o)},e.removeHook=function(m,o){if(o!==void 0){let p=Ei(M[m],o);return p===-1?void 0:Si(M[m],p,1)[0]}return pn(M[m])},e.removeHooks=function(m){M[m]=[]},e.removeAllHooks=function(){M=kn()},e}var wn=_n();var yt=class{constructor(t){this.isVisible=!1;this.conversation=[];this.container=null;this.hasEmbeddedApiKey=!1;this._eval_results=[];this.totalTokenUsage={input_tokens:0,output_tokens:0,cache_creation_input_tokens:0,cache_read_input_tokens:0};this.modelPricing={"claude-sonnet-4-20250514":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-sonnet-20241022":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-haiku-20241022":{input:.8,output:4,cache_write:1,cache_read:.08},"claude-opus-4-20250514":{input:15,output:75,cache_write:18.75,cache_read:1.5}};t?(this.apiKey=t,this.hasEmbeddedApiKey=!0):(this.apiKey=localStorage.getItem("bookmarklet-agent-api-key")||"",this.hasEmbeddedApiKey=!1),this.selectedModel=localStorage.getItem("bookmarklet-agent-model")||"claude-sonnet-4-20250514"}init(){this.createUI(),this.show()}renderMarkdown(t){try{let e=b.parse(t);return wn.sanitize(e)}catch(e){return console.warn("Markdown rendering failed:",e),t.replace(/\n/g,"<br>")}}createUI(){this.container||(this.container=document.createElement("div"),this.container.id="bookmarklet-agent",this.container.innerHTML=`
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
    `,this.addStyles(),this.addEventListeners(),this.addTokenUsageHover(),document.body.appendChild(this.container))}addEventListeners(){if(!this.container)return;this.container.addEventListener("click",e=>{switch(e.target.getAttribute("data-action")){case"close":this.hide();break;case"save-session":this.saveApiKey(!1);break;case"save-persistent":this.saveApiKey(!0);break;case"send":this.sendMessage();break}}),this.container.addEventListener("change",e=>{switch(e.target.getAttribute("data-action")){case"change-model":this.changeModel();break}}),this.container.querySelector("#user-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.sendMessage())}),this.addDragFunctionality()}addDragFunctionality(){if(!this.container)return;let t=this.container.querySelector(".agent-header");if(!t)return;let e=!1,i=0,r=0,n=0,s=0,a=(u,d,g)=>{g.tagName==="BUTTON"||g.tagName==="INPUT"||g.classList.contains("token-usage")||g.closest(".token-usage")||window.innerWidth<=768||(e=!0,n=u-this.container.offsetLeft,s=d-this.container.offsetTop)};t.addEventListener("mousedown",u=>{a(u.clientX,u.clientY,u.target)}),t.addEventListener("touchstart",u=>{if(u.touches.length===1){u.preventDefault();let d=u.touches[0];a(d.clientX,d.clientY,u.target)}},{passive:!1});let l=(u,d)=>{if(!e||!this.container||window.innerWidth<=768)return;i=u-n,r=d-s;let g=window.innerWidth-this.container.offsetWidth,k=window.innerHeight-this.container.offsetHeight;i=Math.max(0,Math.min(i,g)),r=Math.max(0,Math.min(r,k)),this.container.style.left=i+"px",this.container.style.top=r+"px",this.container.style.right="auto"};document.addEventListener("mousemove",u=>{u.preventDefault(),l(u.clientX,u.clientY)}),document.addEventListener("touchmove",u=>{if(u.touches.length===1){u.preventDefault();let d=u.touches[0];l(d.clientX,d.clientY)}},{passive:!1});let c=()=>{e=!1};document.addEventListener("mouseup",c),document.addEventListener("touchend",c)}addTokenUsageHover(){setTimeout(()=>{let t=document.getElementById("token-usage"),e=document.getElementById("token-tooltip");t&&e&&(t.addEventListener("mouseenter",()=>{e.classList.add("show")}),t.addEventListener("mouseleave",()=>{e.classList.remove("show")}),t.addEventListener("touchstart",i=>{i.preventDefault(),e.classList.toggle("show")}))},100)}addStyles(){if(document.getElementById("bookmarklet-agent-styles"))return;let t=document.createElement("style");t.id="bookmarklet-agent-styles",t.textContent=`
      /* CSS isolation for bookmarklet */
      #bookmarklet-agent {
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
      
      /* Mobile responsive styles */
      @media screen and (max-width: 768px) {
        #bookmarklet-agent {
          top: 10px !important;
          right: 10px !important;
          left: 10px !important;
          width: auto !important;
          max-width: calc(100vw - 20px) !important;
          min-width: calc(100vw - 20px) !important;
          max-height: calc(100vh - 20px) !important;
          resize: none !important;
        }
      }
      
      @media screen and (max-width: 480px) {
        #bookmarklet-agent {
          top: 5px !important;
          right: 5px !important;
          left: 5px !important;
          width: auto !important;
          max-width: calc(100vw - 10px) !important;
          min-width: calc(100vw - 10px) !important;
          max-height: calc(100vh - 10px) !important;
          font-size: 13px !important;
        }
        
        #bookmarklet-agent .agent-header {
          padding: 10px 12px !important;
        }
        
        #bookmarklet-agent .agent-header h3 {
          font-size: 15px !important;
        }
        
        #bookmarklet-agent .agent-body {
          padding: 10px !important;
          max-height: calc(100vh - 60px) !important;
        }
        
        #bookmarklet-agent #user-input {
          min-height: 36px !important;
          font-size: 13px !important;
        }
        
        #bookmarklet-agent .send-controls button {
          padding: 6px 12px !important;
        }
        
        #bookmarklet-agent .message {
          font-size: 12px !important;
          padding: 5px 8px !important;
        }
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
        box-sizing: border-box !important;
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
        top: 100% !important;
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
        margin-top: 5px !important;
        max-width: 300px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        line-height: 1.3 !important;
      }
      
      /* Token tooltip hover handled by JavaScript for better reliability */
      #bookmarklet-agent .token-tooltip.show {
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
      
      #bookmarklet-agent .agent-body {
        padding: 12px !important;
        display: flex !important;
        flex-direction: column !important;
        max-height: 520px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      
      #bookmarklet-agent .api-key-section {
        margin-bottom: 12px !important;
        padding: 10px !important;
        background: #f8f9fa !important;
        border-radius: 4px !important;
        box-sizing: border-box !important;
      }
      
      #bookmarklet-agent .api-key-section label {
        display: block !important;
        margin-bottom: 8px !important;
        font-weight: 500 !important;
        color: #000 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .api-key-section input {
        width: 100% !important;
        padding: 8px !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        margin-bottom: 8px !important;
        box-sizing: border-box !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .save-options {
        display: flex !important;
        gap: 8px !important;
        margin-top: 8px !important;
      }
      
      #bookmarklet-agent .save-options button {
        background: #007bff !important;
        color: white !important;
        border: none !important;
        padding: 8px 12px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        font-size: 13px !important;
        flex: 1 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .save-options button:hover {
        background: #0056b3 !important;
      }
      
      #bookmarklet-agent #chat-messages {
        flex: 1 !important;
        overflow-y: auto !important;
        max-height: 300px !important;
        margin-bottom: 12px !important;
        padding-right: 8px !important;
      }
      
      #bookmarklet-agent .message {
        margin-bottom: 8px !important;
        padding: 6px 10px !important;
        border-radius: 6px !important;
        max-width: 90% !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        box-sizing: border-box !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .message.user {
        background: #007bff !important;
        color: white !important;
        margin-left: auto !important;
      }
      
      #bookmarklet-agent .message.assistant {
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        color: #000 !important;
      }
      
      #bookmarklet-agent .message.assistant h1, #bookmarklet-agent .message.assistant h2, #bookmarklet-agent .message.assistant h3,
      #bookmarklet-agent .message.assistant h4, #bookmarklet-agent .message.assistant h5, #bookmarklet-agent .message.assistant h6 {
        margin: 8px 0 4px 0 !important;
        font-size: inherit !important;
        font-weight: 600 !important;
        color: #000 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .message.assistant p {
        margin: 4px 0 !important;
        color: #000 !important;
      }
      
      #bookmarklet-agent .message.assistant ul, #bookmarklet-agent .message.assistant ol {
        margin: 4px 0 !important;
        padding-left: 16px !important;
      }
      
      #bookmarklet-agent .message.assistant li {
        margin: 2px 0 !important;
        color: #000 !important;
      }
      
      #bookmarklet-agent .message.assistant code {
        background: rgba(0,0,0,0.1) !important;
        padding: 1px 3px !important;
        border-radius: 2px !important;
        font-family: 'Monaco', 'Consolas', monospace !important;
        font-size: 12px !important;
      }
      
      #bookmarklet-agent .message.assistant pre {
        background: rgba(0,0,0,0.05) !important;
        padding: 8px !important;
        border-radius: 4px !important;
        overflow-x: auto !important;
        margin: 4px 0 !important;
      }
      
      #bookmarklet-agent .message.assistant pre code {
        background: none !important;
        padding: 0 !important;
      }
      
      #bookmarklet-agent .message.assistant blockquote {
        border-left: 3px solid #ddd !important;
        margin: 4px 0 !important;
        padding-left: 12px !important;
        color: #666 !important;
      }
      
      #bookmarklet-agent .tool-result-preview, #bookmarklet-agent .tool-result-full {
        font-family: 'Monaco', 'Consolas', monospace !important;
        font-size: 12px !important;
        white-space: pre-wrap !important;
        word-break: break-word !important;
        color: #000 !important;
      }
      
      #bookmarklet-agent .expand-tool-result {
        background: #007bff !important;
        border: none !important;
        padding: 6px 12px !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        color: white !important;
        cursor: pointer !important;
        margin-top: 8px !important;
        font-weight: 500 !important;
        display: inline-block !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .expand-tool-result:hover {
        background: #0056b3 !important;
      }
      
      #bookmarklet-agent .input-section {
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
      }
      
      #bookmarklet-agent #user-input {
        padding: 8px !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        resize: vertical !important;
        min-height: 40px !important;
        max-height: 120px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        box-sizing: border-box !important;
        background: white !important;
        color: #000 !important;
      }
      
      #bookmarklet-agent .send-controls {
        display: flex !important;
        gap: 8px !important;
        align-items: center !important;
      }
      
      #bookmarklet-agent .send-controls select {
        padding: 6px 8px !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        background: white !important;
        font-size: 12px !important;
        color: #666 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .send-controls button {
        background: #007bff !important;
        color: white !important;
        border: none !important;
        padding: 8px 16px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        flex: 1 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .thinking {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 8px 12px !important;
        color: #666 !important;
        font-style: italic !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }
      
      #bookmarklet-agent .thinking-dots {
        display: inline-flex !important;
        gap: 2px !important;
      }
      
      #bookmarklet-agent .thinking-dots span {
        width: 4px !important;
        height: 4px !important;
        background: #666 !important;
        border-radius: 50% !important;
        animation: thinking 1.4s ease-in-out infinite both !important;
        display: block !important;
      }
      
      #bookmarklet-agent .thinking-dots span:nth-child(1) { animation-delay: -0.32s !important; }
      #bookmarklet-agent .thinking-dots span:nth-child(2) { animation-delay: -0.16s !important; }
      #bookmarklet-agent .thinking-dots span:nth-child(3) { animation-delay: 0s !important; }
      
      @keyframes thinking {
        0%, 80%, 100% {
          transform: scale(0.8) !important;
          opacity: 0.5 !important;
        } 40% {
          transform: scale(1) !important;
          opacity: 1 !important;
        }
      }
    `,document.head.appendChild(t)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0)}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1)}toggle(){this.isVisible?this.hide():this.show()}get eval_results(){return this._eval_results}calculateCost(t,e){let i=this.modelPricing[e];if(!i)return 0;let r=t.input_tokens/1e6*i.input,n=t.output_tokens/1e6*i.output,s=(t.cache_creation_input_tokens||0)/1e6*i.cache_write,a=(t.cache_read_input_tokens||0)/1e6*i.cache_read;return r+n+s+a}updateTokenUsage(t){this.totalTokenUsage.input_tokens+=t.input_tokens,this.totalTokenUsage.output_tokens+=t.output_tokens,this.totalTokenUsage.cache_creation_input_tokens+=t.cache_creation_input_tokens||0,this.totalTokenUsage.cache_read_input_tokens+=t.cache_read_input_tokens||0}formatCost(t){return t<.01?`${(t*100).toFixed(2)}\xA2`:`$${t.toFixed(4)}`}updateTokenDisplay(){let t=document.getElementById("token-usage"),e=document.getElementById("token-tooltip");if(!t||!e)return;let i=this.calculateCost(this.totalTokenUsage,this.selectedModel),r=this.totalTokenUsage.input_tokens+this.totalTokenUsage.output_tokens;if(r===0){t.childNodes[0].textContent="",e.textContent="";return}let n=t.childNodes[0];n?n.textContent=`Tokens: ${r.toLocaleString()} | Cost: ${this.formatCost(i)}`:t.insertBefore(document.createTextNode(`Tokens: ${r.toLocaleString()} | Cost: ${this.formatCost(i)}`),e);let s=this.modelPricing[this.selectedModel];if(s){let a=[`Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} \xD7 $${s.input}/M = ${this.formatCost(this.totalTokenUsage.input_tokens/1e6*s.input)}`,`Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} \xD7 $${s.output}/M = ${this.formatCost(this.totalTokenUsage.output_tokens/1e6*s.output)}`];this.totalTokenUsage.cache_creation_input_tokens&&a.push(`Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} \xD7 $${s.cache_write}/M = ${this.formatCost(this.totalTokenUsage.cache_creation_input_tokens/1e6*s.cache_write)}`),this.totalTokenUsage.cache_read_input_tokens&&a.push(`Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} \xD7 $${s.cache_read}/M = ${this.formatCost(this.totalTokenUsage.cache_read_input_tokens/1e6*s.cache_read)}`),e.textContent=a.join(`
`)}}handleUnauthorized(){this.apiKey="",this.hasEmbeddedApiKey||localStorage.removeItem("bookmarklet-agent-api-key");let t=document.querySelector(".api-key-section");t&&(t.style.display="block");let e=document.getElementById("api-key-input");e&&(e.value="")}saveApiKey(t=!1){let e=document.getElementById("api-key-input");if(this.apiKey=e.value.trim(),t&&!this.hasEmbeddedApiKey&&localStorage.setItem("bookmarklet-agent-api-key",this.apiKey),this.apiKey){let i=document.querySelector(".api-key-section");i&&(i.style.display="none")}}changeModel(){let t=document.getElementById("model-select");this.selectedModel=t.value,localStorage.setItem("bookmarklet-agent-model",this.selectedModel)}showThinking(){this.hideThinking();let t=document.getElementById("chat-messages");if(!t)return;let e=document.createElement("div");e.id="thinking-indicator",e.className="thinking",e.innerHTML=`
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}hideThinking(){let t=document.getElementById("thinking-indicator");t&&t.remove()}async sendMessage(){let t=document.getElementById("user-input"),e=t.value.trim();if(e){if(!this.apiKey){alert("Please enter your Anthropic API key first");return}t.value="",this.addMessage("user",e),this.showThinking();try{await this.runAgentLoop(e)}catch(i){this.addMessage("assistant",`Error: ${i.message}`)}finally{this.hideThinking()}}}async runAgentLoop(t){let e=this.getPageContext(),i=[...this.conversation.filter(r=>r.role!=="system"),{role:"user",content:t}];for(;;){let r=await this.callAnthropicAPIWithMessages(i,e),n="",s=[];for(let l of r.content)l.type==="text"?n+=l.text:l.type==="tool_use"&&s.push({id:l.id,name:l.name,input:l.input});if(i.push({role:"assistant",content:r.content}),n.trim()&&this.addMessage("assistant",n),s.length===0)break;let a=[];for(let l of s){let c=await this.handleToolCall(l);a.push({type:"tool_result",tool_use_id:c.tool_use_id,content:c.content,is_error:c.is_error});let u=`\u{1F527} **${l.name}**
\`\`\`javascript
${JSON.stringify(l.input,null,2)}
\`\`\``,d=c.is_error?`\u274C **Error:**
${c.content}`:`\u2705 **Result:**
${c.content}`,g=`${u}

${d}`;this.addMessage("assistant",g,!0)}i.push({role:"user",content:a})}this.conversation=i.map(r=>({role:r.role,content:typeof r.content=="string"?r.content:JSON.stringify(r.content)}))}addMessage(t,e,i=!1){let r=document.getElementById("chat-messages");if(!r)return;let n=document.createElement("div");if(n.className=`message ${t}`,i){let s=e.split(`
`),a=s.slice(0,2).join(`
`),l=s.length>2;n.innerHTML=`
        <div class="tool-result-preview">${this.escapeHtml(a)}</div>
        ${l?`
          <div class="tool-result-full" style="display: none;">${this.escapeHtml(e)}</div>
          <button class="expand-tool-result" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">\u{1F4CB} Show Full Result</button>
        `:""}
      `}else if(t==="assistant"){let s=this.renderMarkdown(e);n.innerHTML=s}else n.textContent=e;r.appendChild(n),r.scrollTop=r.scrollHeight,this.conversation.push({role:t,content:e})}escapeHtml(t){let e=document.createElement("div");return e.textContent=t,e.innerHTML}getPageContext(){return{url:window.location.href,title:document.title,selectedText:window.getSelection()?.toString()||"",forms:Array.from(document.forms).map(t=>({action:t.action,method:t.method,elements:Array.from(t.elements).map(e=>{let i=e;return{name:i.name,type:i.type,value:i.value}})})),headings:Array.from(document.querySelectorAll("h1, h2, h3")).map(t=>t.textContent?.trim()||"").slice(0,10),links:Array.from(document.querySelectorAll("a[href]")).map(t=>({text:t.textContent?.trim()||"",href:t.href})).slice(0,20)}}async callAnthropicAPIWithMessages(t,e){let i=[{name:"eval_js",description:"Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",input_schema:{type:"object",properties:{code:{type:"string",description:"JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions."}},required:["code"]}}],r=`You are a helpful web agent that can analyze and interact with web pages using tools.
    
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

Be concise and helpful. Always use the eval_js tool when the user asks you to interact with the page.`;try{let n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.selectedModel,max_tokens:1e3,system:[{type:"text",text:r,cache_control:{type:"ephemeral"}}],tools:i,messages:t.map((a,l)=>l===t.length-1&&a.role==="user"?{...a,content:typeof a.content=="string"?[{type:"text",text:a.content,cache_control:{type:"ephemeral"}}]:Array.isArray(a.content)?a.content.map((c,u)=>u===a.content.length-1?{...c,cache_control:{type:"ephemeral"}}:c):a.content}:a)})});if(!n.ok)throw n.status===401?(this.handleUnauthorized(),new Error("Invalid API key. Please enter a valid Anthropic API key.")):new Error(`API request failed: ${n.status}`);let s=await n.json();if(s.usage){this.updateTokenUsage(s.usage),this.updateTokenDisplay();let a=this.calculateCost(s.usage,this.selectedModel);console.log(`Request cost: ${this.formatCost(a)}, Total cost: ${this.formatCost(this.calculateCost(this.totalTokenUsage,this.selectedModel))}`)}return s}catch(n){throw n instanceof TypeError&&n.message.includes("fetch")?new Error(`CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`):n}}async handleToolCall(toolCall){try{switch(toolCall.name){case"eval_js":let code=toolCall.input.code,result=eval(code),resultString=String(result||"Code executed successfully"),maxLength=10*1024;if(resultString.length>maxLength){let t=this._eval_results.length;this._eval_results.push(result);let e=resultString.substring(0,maxLength);return{tool_use_id:toolCall.id,content:`${e}...

[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${t}]]`}}return{tool_use_id:toolCall.id,content:resultString};default:return{tool_use_id:toolCall.id,content:`Unknown tool: ${toolCall.name}`,is_error:!0}}}catch(t){return{tool_use_id:toolCall.id,content:`Error: ${t.message}`,is_error:!0}}}};window.bookmarkletAgent=new yt(window.BOOKMARKLET_API_KEY);})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE *)
*/
