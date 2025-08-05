"use strict";(()=>{function it(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ee=it();function Vt(t){ee=t}var ge={exec:()=>null};function x(t,e=""){let r=typeof t=="string"?t:t.source,i={replace:(n,a)=>{let s=typeof a=="string"?a:a.source;return s=s.replace(C.caret,"$1"),r=r.replace(n,s),i},getRegex:()=>new RegExp(r,e)};return i}var C={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Un=/^(?:[ \t]*(?:\n|$))+/,Bn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fe=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ot=/(?:[*+-]|\d{1,9}[.)])/,Qt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jt=x(Qt).replace(/bull/g,ot).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gn=x(Qt).replace(/bull/g,ot).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),st=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qn=/^[^\n]+/,at=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Wn=x(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",at).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jn=x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ot).getRegex(),Ne="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yn=x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",Ne).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),en=x(st).replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Kn=x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",en).getRegex(),ct={blockquote:Kn,code:Bn,def:Wn,fences:Fn,heading:Hn,hr:fe,html:Yn,lheading:Jt,list:jn,newline:Un,paragraph:en,table:ge,text:qn},jt=x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Zn={...ct,lheading:Gn,table:jt,paragraph:x(st).replace("hr",fe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",jt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex()},Xn={...ct,html:x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ge,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:x(st).replace("hr",fe).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vn=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tn=/^( {2,}|\\)\n(?!\s*$)/,Jn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$e=/[\p{P}\p{S}]/u,pt=/[\s\p{P}\p{S}]/u,nn=/[^\s\p{P}\p{S}]/u,er=x(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,pt).getRegex(),rn=/(?!~)[\p{P}\p{S}]/u,tr=/(?!~)[\s\p{P}\p{S}]/u,nr=/(?:[^\s\p{P}\p{S}]|~)/u,rr=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,on=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ir=x(on,"u").replace(/punct/g,$e).getRegex(),or=x(on,"u").replace(/punct/g,rn).getRegex(),sn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sr=x(sn,"gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),ar=x(sn,"gu").replace(/notPunctSpace/g,nr).replace(/punctSpace/g,tr).replace(/punct/g,rn).getRegex(),lr=x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nn).replace(/punctSpace/g,pt).replace(/punct/g,$e).getRegex(),cr=x(/\\(punct)/,"gu").replace(/punct/g,$e).getRegex(),pr=x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ur=x(lt).replace("(?:-->|$)","-->").getRegex(),hr=x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ur).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Oe=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,mr=x(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Oe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),an=x(/^!?\[(label)\]\[(ref)\]/).replace("label",Oe).replace("ref",at).getRegex(),ln=x(/^!?\[(ref)\](?:\[\])?/).replace("ref",at).getRegex(),dr=x("reflink|nolink(?!\\()","g").replace("reflink",an).replace("nolink",ln).getRegex(),ut={_backpedal:ge,anyPunctuation:cr,autolink:pr,blockSkip:rr,br:tn,code:Qn,del:ge,emStrongLDelim:ir,emStrongRDelimAst:sr,emStrongRDelimUnd:lr,escape:Vn,link:mr,nolink:ln,punctuation:er,reflink:an,reflinkSearch:dr,tag:hr,text:Jn,url:ge},gr={...ut,link:x(/^!?\[(label)\]\((.*?)\)/).replace("label",Oe).getRegex(),reflink:x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Oe).getRegex()},tt={...ut,emStrongRDelimAst:ar,emStrongLDelim:or,url:x(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},fr={...tt,br:x(tn).replace("{2,}","*").getRegex(),text:x(tt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Me={normal:ct,gfm:Zn,pedantic:Xn},me={normal:ut,gfm:tt,breaks:fr,pedantic:gr},kr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yt=t=>kr[t];function F(t,e){if(e){if(C.escapeTest.test(t))return t.replace(C.escapeReplace,Yt)}else if(C.escapeTestNoEncode.test(t))return t.replace(C.escapeReplaceNoEncode,Yt);return t}function Kt(t){try{t=encodeURI(t).replace(C.percentDecode,"%")}catch{return null}return t}function Zt(t,e){let r=t.replace(C.findPipe,(a,s,l)=>{let c=!1,u=s;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),i=r.split(C.splitPipe),n=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;n<i.length;n++)i[n]=i[n].trim().replace(C.slashPipe,"|");return i}function de(t,e,r){let i=t.length;if(i===0)return"";let n=0;for(;n<i;){let a=t.charAt(i-n-1);if(a===e&&!r)n++;else if(a!==e&&r)n++;else break}return t.slice(0,i-n)}function br(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])r++;else if(t[i]===e[1]&&(r--,r<0))return i;return r>0?-2:-1}function Xt(t,e,r,i,n){let a=e.href,s=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");i.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:a,title:s,text:l,tokens:i.inlineTokens(l)};return i.state.inLink=!1,c}function xr(t,e,r){let i=t.match(r.other.indentCodeCompensation);if(i===null)return e;let n=i[1];return e.split(`
`).map(a=>{let s=a.match(r.other.beginningSpace);if(s===null)return a;let[l]=s;return l.length>=n.length?a.slice(n.length):a}).join(`
`)}var Pe=class{options;rules;lexer;constructor(t){this.options=t||ee}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:de(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],i=xr(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let i=de(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:de(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=de(e[0],`
`).split(`
`),i="",n="",a=[];for(;r.length>0;){let s=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),s=!0;else if(!s)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),g=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${u}`:u,n=n?`${n}
${g}`:g;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,a,!0),this.lexer.state.top=f,r.length===0)break;let k=a.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let w=k,y=w.raw+`
`+r.join(`
`),N=this.blockquote(y);a[a.length-1]=N,i=i.substring(0,i.length-w.raw.length)+N.raw,n=n.substring(0,n.length-w.text.length)+N.text;break}else if(k?.type==="list"){let w=k,y=w.raw+`
`+r.join(`
`),N=this.list(y);a[a.length-1]=N,i=i.substring(0,i.length-k.raw.length)+N.raw,n=n.substring(0,n.length-w.raw.length)+N.raw,r=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),i=r.length>1,n={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");let a=this.rules.other.listItemRegex(r),s=!1;for(;t;){let c=!1,u="",g="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let f=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,le=>" ".repeat(3*le.length)),k=t.split(`
`,1)[0],w=!f.trim(),y=0;if(this.options.pedantic?(y=2,g=f.trimStart()):w?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,g=f.slice(y),y+=e[1].length),w&&this.rules.other.blankLine.test(k)&&(u+=k+`
`,t=t.substring(k.length+1),c=!0),!c){let le=this.rules.other.nextBulletRegex(y),we=this.rules.other.hrRegex(y),K=this.rules.other.fencesBeginRegex(y),S=this.rules.other.headingBeginRegex(y),Z=this.rules.other.htmlBeginRegex(y);for(;t;){let X=t.split(`
`,1)[0],V;if(k=X,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),V=k):V=k.replace(this.rules.other.tabCharGlobal,"    "),K.test(k)||S.test(k)||Z.test(k)||le.test(k)||we.test(k))break;if(V.search(this.rules.other.nonSpaceChar)>=y||!k.trim())g+=`
`+V.slice(y);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(f)||S.test(f)||we.test(f))break;g+=`
`+k}!w&&!k.trim()&&(w=!0),u+=X+`
`,t=t.substring(X.length+1),f=V.slice(y)}}n.loose||(s?n.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0));let N=null,Te;this.options.gfm&&(N=this.rules.other.listIsTask.exec(g),N&&(Te=N[0]!=="[ ] ",g=g.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:u,task:!!N,checked:Te,loose:!1,text:g,tokens:[]}),n.raw+=u}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c=0;c<n.items.length;c++)if(this.lexer.state.top=!1,n.items[c].tokens=this.lexer.blockTokens(n.items[c].text,[]),!n.loose){let u=n.items[c].tokens.filter(f=>f.type==="space"),g=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));n.loose=g}if(n.loose)for(let c=0;c<n.items.length;c++)n.items[c].loose=!0;return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:i,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Zt(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===i.length){for(let s of i)this.rules.other.tableAlignRight.test(s)?a.align.push("right"):this.rules.other.tableAlignCenter.test(s)?a.align.push("center"):this.rules.other.tableAlignLeft.test(s)?a.align.push("left"):a.align.push(null);for(let s=0;s<r.length;s++)a.header.push({text:r[s],tokens:this.lexer.inline(r[s]),header:!0,align:a.align[s]});for(let s of n)a.rows.push(Zt(s,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let a=de(r.slice(0,-1),"\\");if((r.length-a.length)%2===0)return}else{let a=br(e[2],"()");if(a===-2)return;if(a>-1){let s=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,s).trim(),e[3]=""}}let i=e[2],n="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],n=a[3])}else n=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),Xt(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[i.toLowerCase()];if(!n){let a=r[0].charAt(0);return{type:"text",raw:a,text:a}}return Xt(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...i[0]].length-1,a,s,l=n,c=0,u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+n);(i=u.exec(e))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(s=[...a].length,i[3]||i[4]){l+=s;continue}else if((i[5]||i[6])&&n%3&&!((n+s)%3)){c+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+c);let g=[...i[0]][0].length,f=t.slice(0,n+i.index+g+s);if(Math.min(n,s)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let k=f.slice(2,-2);return{type:"strong",raw:f,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,i;return e[2]==="@"?(r=e[1],i="mailto:"+r):(r=e[1],i=r),{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,i;if(e[2]==="@")r=e[0],i="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},W=class nt{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ee,this.options.tokenizer=this.options.tokenizer||new Pe,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:C,block:Me.normal,inline:me.normal};this.options.pedantic?(r.block=Me.pedantic,r.inline=me.pedantic):this.options.gfm&&(r.block=Me.gfm,this.options.breaks?r.inline=me.breaks:r.inline=me.gfm),this.tokenizer.rules=r}static get rules(){return{block:Me,inline:me}}static lex(e,r){return new nt(r).lex(e)}static lexInline(e,r){return new nt(r).inlineTokens(e)}lex(e){e=e.replace(C.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let i=this.inlineQueue[r];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],i=!1){for(this.options.pedantic&&(e=e.replace(C.tabCharGlobal,"    ").replace(C.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(s=>(n=s.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let s=r.at(-1);n.raw.length===1&&s!==void 0?s.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let s=r.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.at(-1).src=s.text):r.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let s=r.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),r.push(n);continue}let a=e;if(this.options.extensions?.startBlock){let s=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(s=Math.min(s,c))}),s<1/0&&s>=0&&(a=e.substring(0,s+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){let s=r.at(-1);i&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):r.push(n),i=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let s=r.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):r.push(n);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let i=e,n=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,n.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(n=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,s="";for(;e;){a||(s=""),a=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},e,r))?(e=e.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let u=r.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(e,i,s)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),r.push(l);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,g=e.slice(1),f;this.options.extensions.startInline.forEach(k=>{f=k.call({lexer:this},g),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(s=l.raw.slice(-1)),a=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},De=class{options;parser;constructor(t){this.options=t||ee}space(t){return""}code({text:t,lang:e,escaped:r}){let i=(e||"").match(C.notSpaceStart)?.[0],n=t.replace(C.endingNewline,"")+`
`;return i?'<pre><code class="language-'+F(i)+'">'+(r?n:F(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:F(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,i="";for(let s=0;s<t.items.length;s++){let l=t.items[s];i+=this.listitem(l)}let n=e?"ol":"ul",a=e&&r!==1?' start="'+r+'"':"";return"<"+n+a+`>
`+i+"</"+n+`>
`}listitem(t){let e="";if(t.task){let r=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=r+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=r+" "+F(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):e+=r+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let n=0;n<t.header.length;n++)r+=this.tablecell(t.header[n]);e+=this.tablerow({text:r});let i="";for(let n=0;n<t.rows.length;n++){let a=t.rows[n];r="";for(let s=0;s<a.length;s++)r+=this.tablecell(a[s]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${F(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let i=this.parser.parseInline(r),n=Kt(t);if(n===null)return i;t=n;let a='<a href="'+t+'"';return e&&(a+=' title="'+F(e)+'"'),a+=">"+i+"</a>",a}image({href:t,title:e,text:r,tokens:i}){i&&(r=this.parser.parseInline(i,this.parser.textRenderer));let n=Kt(t);if(n===null)return F(r);t=n;let a=`<img src="${t}" alt="${r}"`;return e&&(a+=` title="${F(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:F(t.text)}},ht=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},j=class rt{options;renderer;textRenderer;constructor(e){this.options=e||ee,this.options.renderer=this.options.renderer||new De,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ht}static parse(e,r){return new rt(r).parse(e)}static parseInline(e,r){return new rt(r).parseInline(e)}parse(e,r=!0){let i="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=a,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){i+=c||"";continue}}let s=a;switch(s.type){case"space":{i+=this.renderer.space(s);continue}case"hr":{i+=this.renderer.hr(s);continue}case"heading":{i+=this.renderer.heading(s);continue}case"code":{i+=this.renderer.code(s);continue}case"table":{i+=this.renderer.table(s);continue}case"blockquote":{i+=this.renderer.blockquote(s);continue}case"list":{i+=this.renderer.list(s);continue}case"html":{i+=this.renderer.html(s);continue}case"paragraph":{i+=this.renderer.paragraph(s);continue}case"text":{let l=s,c=this.renderer.text(l);for(;n+1<e.length&&e[n+1].type==="text";)l=e[++n],c+=`
`+this.renderer.text(l);r?i+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):i+=c;continue}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}parseInline(e,r=this.renderer){let i="";for(let n=0;n<e.length;n++){let a=e[n];if(this.options.extensions?.renderers?.[a.type]){let l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=l||"";continue}}let s=a;switch(s.type){case"escape":{i+=r.text(s);break}case"html":{i+=r.html(s);break}case"link":{i+=r.link(s);break}case"image":{i+=r.image(s);break}case"strong":{i+=r.strong(s);break}case"em":{i+=r.em(s);break}case"codespan":{i+=r.codespan(s);break}case"br":{i+=r.br(s);break}case"del":{i+=r.del(s);break}case"text":{i+=r.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}},Ce=class{options;block;constructor(t){this.options=t||ee}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?W.lex:W.lexInline}provideParser(){return this.block?j.parse:j.parseInline}},yr=class{defaults=it();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=j;Renderer=De;TextRenderer=ht;Lexer=W;Tokenizer=Pe;Hooks=Ce;constructor(...t){this.use(...t)}walkTokens(t,e){let r=[];for(let i of t)switch(r=r.concat(e.call(this,i)),i.type){case"table":{let n=i;for(let a of n.header)r=r.concat(this.walkTokens(a.tokens,e));for(let a of n.rows)for(let s of a)r=r.concat(this.walkTokens(s.tokens,e));break}case"list":{let n=i;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=i;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(a=>{let s=n[a].flat(1/0);r=r.concat(this.walkTokens(s,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let a=e.renderers[n.name];a?e.renderers[n.name]=function(...s){let l=n.renderer.apply(this,s);return l===!1&&(l=a.apply(this,s)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[n.level];a?a.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),i.extensions=e),r.renderer){let n=this.defaults.renderer||new De(this.defaults);for(let a in r.renderer){if(!(a in n))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let s=a,l=r.renderer[s],c=n[s];n[s]=(...u)=>{let g=l.apply(n,u);return g===!1&&(g=c.apply(n,u)),g||""}}i.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Pe(this.defaults);for(let a in r.tokenizer){if(!(a in n))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let s=a,l=r.tokenizer[s],c=n[s];n[s]=(...u)=>{let g=l.apply(n,u);return g===!1&&(g=c.apply(n,u)),g}}i.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new Ce;for(let a in r.hooks){if(!(a in n))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let s=a,l=r.hooks[s],c=n[s];Ce.passThroughHooks.has(a)?n[s]=u=>{if(this.defaults.async)return Promise.resolve(l.call(n,u)).then(f=>c.call(n,f));let g=l.call(n,u);return c.call(n,g)}:n[s]=(...u)=>{let g=l.apply(n,u);return g===!1&&(g=c.apply(n,u)),g}}i.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,a=r.walkTokens;i.walkTokens=function(s){let l=[];return l.push(a.call(this,s)),n&&(l=l.concat(n.call(this,s))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return W.lex(t,e??this.defaults)}parser(t,e){return j.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let i={...r},n={...this.defaults,...i},a=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));n.hooks&&(n.hooks.options=n,n.hooks.block=t);let s=n.hooks?n.hooks.provideLexer():t?W.lex:W.lexInline,l=n.hooks?n.hooks.provideParser():t?j.parse:j.parseInline;if(n.async)return Promise.resolve(n.hooks?n.hooks.preprocess(e):e).then(c=>s(c,n)).then(c=>n.hooks?n.hooks.processAllTokens(c):c).then(c=>n.walkTokens?Promise.all(this.walkTokens(c,n.walkTokens)).then(()=>c):c).then(c=>l(c,n)).then(c=>n.hooks?n.hooks.postprocess(c):c).catch(a);try{n.hooks&&(e=n.hooks.preprocess(e));let c=s(e,n);n.hooks&&(c=n.hooks.processAllTokens(c)),n.walkTokens&&this.walkTokens(c,n.walkTokens);let u=l(c,n);return n.hooks&&(u=n.hooks.postprocess(u)),u}catch(c){return a(c)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+F(r.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(r);throw r}}},J=new yr;function b(t,e){return J.parse(t,e)}b.options=b.setOptions=function(t){return J.setOptions(t),b.defaults=J.defaults,Vt(b.defaults),b};b.getDefaults=it;b.defaults=ee;b.use=function(...t){return J.use(...t),b.defaults=J.defaults,Vt(b.defaults),b};b.walkTokens=function(t,e){return J.walkTokens(t,e)};b.parseInline=J.parseInline;b.Parser=j;b.parser=j.parse;b.Renderer=De;b.TextRenderer=ht;b.Lexer=W;b.lexer=W.lex;b.Tokenizer=Pe;b.Hooks=Ce;b.parse=b;var Hr=b.options,Gr=b.setOptions,qr=b.use,Wr=b.walkTokens,jr=b.parseInline;var Yr=j.parse,Kr=W.lex;var{entries:bn,setPrototypeOf:cn,isFrozen:_r,getPrototypeOf:Tr,getOwnPropertyDescriptor:wr}=Object,{freeze:P,seal:z,create:xn}=Object,{apply:bt,construct:xt}=typeof Reflect<"u"&&Reflect;P||(P=function(e){return e});z||(z=function(e){return e});bt||(bt=function(e,r,i){return e.apply(r,i)});xt||(xt=function(e,r){return new e(...r)});var ze=D(Array.prototype.forEach),Er=D(Array.prototype.lastIndexOf),pn=D(Array.prototype.pop),ke=D(Array.prototype.push),Sr=D(Array.prototype.splice),Be=D(String.prototype.toLowerCase),mt=D(String.prototype.toString),un=D(String.prototype.match),be=D(String.prototype.replace),Ar=D(String.prototype.indexOf),vr=D(String.prototype.trim),U=D(Object.prototype.hasOwnProperty),O=D(RegExp.prototype.test),xe=Rr(TypeError);function D(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,i=new Array(r>1?r-1:0),n=1;n<r;n++)i[n-1]=arguments[n];return bt(t,e,i)}}function Rr(t){return function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return xt(t,r)}}function d(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Be;cn&&cn(t,null);let i=e.length;for(;i--;){let n=e[i];if(typeof n=="string"){let a=r(n);a!==n&&(_r(e)||(e[i]=a),n=a)}t[n]=!0}return t}function Ir(t){for(let e=0;e<t.length;e++)U(t,e)||(t[e]=null);return t}function Y(t){let e=xn(null);for(let[r,i]of bn(t))U(t,r)&&(Array.isArray(i)?e[r]=Ir(i):i&&typeof i=="object"&&i.constructor===Object?e[r]=Y(i):e[r]=i);return e}function ye(t,e){for(;t!==null;){let i=wr(t,e);if(i){if(i.get)return D(i.get);if(typeof i.value=="function")return D(i.value)}t=Tr(t)}function r(){return null}return r}var hn=P(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dt=P(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gt=P(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Lr=P(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ft=P(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mr=P(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),mn=P(["#text"]),dn=P(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),kt=P(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gn=P(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ue=P(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cr=z(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Or=z(/<%[\w\W]*|[\w\W]*%>/gm),Pr=z(/\$\{[\w\W]*/gm),Dr=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Nr=z(/^aria-[\-\w]+$/),yn=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$r=z(/^(?:\w+script|data):/i),zr=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_n=z(/^html$/i),Ur=z(/^[a-z][.\w]*(-[.\w]+)+$/i),fn=Object.freeze({__proto__:null,ARIA_ATTR:Nr,ATTR_WHITESPACE:zr,CUSTOM_ELEMENT:Ur,DATA_ATTR:Dr,DOCTYPE_NAME:_n,ERB_EXPR:Or,IS_ALLOWED_URI:yn,IS_SCRIPT_OR_DATA:$r,MUSTACHE_EXPR:Cr,TMPLIT_EXPR:Pr}),_e={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Br=function(){return typeof window>"u"?null:window},Fr=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(i=r.getAttribute(n));let a="dompurify"+(i?"#"+i:"");try{return e.createPolicy(a,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},kn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Tn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Br(),e=m=>Tn(m);if(e.version="3.2.6",e.removed=[],!t||!t.document||t.document.nodeType!==_e.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,i=r,n=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:s,Node:l,Element:c,NodeFilter:u,NamedNodeMap:g=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:f,DOMParser:k,trustedTypes:w}=t,y=c.prototype,N=ye(y,"cloneNode"),Te=ye(y,"remove"),le=ye(y,"nextSibling"),we=ye(y,"childNodes"),K=ye(y,"parentNode");if(typeof s=="function"){let m=r.createElement("template");m.content&&m.content.ownerDocument&&(r=m.content.ownerDocument)}let S,Z="",{implementation:X,createNodeIterator:V,createDocumentFragment:En,getElementsByTagName:Sn}=r,{importNode:An}=i,M=kn();e.isSupported=typeof bn=="function"&&typeof K=="function"&&X&&X.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Fe,ERB_EXPR:He,TMPLIT_EXPR:Ge,DATA_ATTR:vn,ARIA_ATTR:Rn,IS_SCRIPT_OR_DATA:In,ATTR_WHITESPACE:_t,CUSTOM_ELEMENT:Ln}=fn,{IS_ALLOWED_URI:Tt}=fn,A=null,wt=d({},[...hn,...dt,...gt,...ft,...mn]),R=null,Et=d({},[...dn,...kt,...gn,...Ue]),T=Object.seal(xn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ce=null,qe=null,St=!0,We=!0,At=!1,vt=!0,te=!1,Ee=!0,Q=!1,je=!1,Ye=!1,ne=!1,Se=!1,Ae=!1,Rt=!0,It=!1,Mn="user-content-",Ke=!0,pe=!1,re={},ie=null,Lt=d({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Mt=null,Ct=d({},["audio","video","img","source","image","track"]),Ze=null,Ot=d({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ve="http://www.w3.org/1998/Math/MathML",Re="http://www.w3.org/2000/svg",H="http://www.w3.org/1999/xhtml",oe=H,Xe=!1,Ve=null,Cn=d({},[ve,Re,H],mt),Ie=d({},["mi","mo","mn","ms","mtext"]),Le=d({},["annotation-xml"]),On=d({},["title","style","font","a","script"]),ue=null,Pn=["application/xhtml+xml","text/html"],Dn="text/html",v=null,se=null,Nn=r.createElement("form"),Pt=function(o){return o instanceof RegExp||o instanceof Function},Qe=function(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(se&&se===o)){if((!o||typeof o!="object")&&(o={}),o=Y(o),ue=Pn.indexOf(o.PARSER_MEDIA_TYPE)===-1?Dn:o.PARSER_MEDIA_TYPE,v=ue==="application/xhtml+xml"?mt:Be,A=U(o,"ALLOWED_TAGS")?d({},o.ALLOWED_TAGS,v):wt,R=U(o,"ALLOWED_ATTR")?d({},o.ALLOWED_ATTR,v):Et,Ve=U(o,"ALLOWED_NAMESPACES")?d({},o.ALLOWED_NAMESPACES,mt):Cn,Ze=U(o,"ADD_URI_SAFE_ATTR")?d(Y(Ot),o.ADD_URI_SAFE_ATTR,v):Ot,Mt=U(o,"ADD_DATA_URI_TAGS")?d(Y(Ct),o.ADD_DATA_URI_TAGS,v):Ct,ie=U(o,"FORBID_CONTENTS")?d({},o.FORBID_CONTENTS,v):Lt,ce=U(o,"FORBID_TAGS")?d({},o.FORBID_TAGS,v):Y({}),qe=U(o,"FORBID_ATTR")?d({},o.FORBID_ATTR,v):Y({}),re=U(o,"USE_PROFILES")?o.USE_PROFILES:!1,St=o.ALLOW_ARIA_ATTR!==!1,We=o.ALLOW_DATA_ATTR!==!1,At=o.ALLOW_UNKNOWN_PROTOCOLS||!1,vt=o.ALLOW_SELF_CLOSE_IN_ATTR!==!1,te=o.SAFE_FOR_TEMPLATES||!1,Ee=o.SAFE_FOR_XML!==!1,Q=o.WHOLE_DOCUMENT||!1,ne=o.RETURN_DOM||!1,Se=o.RETURN_DOM_FRAGMENT||!1,Ae=o.RETURN_TRUSTED_TYPE||!1,Ye=o.FORCE_BODY||!1,Rt=o.SANITIZE_DOM!==!1,It=o.SANITIZE_NAMED_PROPS||!1,Ke=o.KEEP_CONTENT!==!1,pe=o.IN_PLACE||!1,Tt=o.ALLOWED_URI_REGEXP||yn,oe=o.NAMESPACE||H,Ie=o.MATHML_TEXT_INTEGRATION_POINTS||Ie,Le=o.HTML_INTEGRATION_POINTS||Le,T=o.CUSTOM_ELEMENT_HANDLING||{},o.CUSTOM_ELEMENT_HANDLING&&Pt(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(T.tagNameCheck=o.CUSTOM_ELEMENT_HANDLING.tagNameCheck),o.CUSTOM_ELEMENT_HANDLING&&Pt(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(T.attributeNameCheck=o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),o.CUSTOM_ELEMENT_HANDLING&&typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),te&&(We=!1),Se&&(ne=!0),re&&(A=d({},mn),R=[],re.html===!0&&(d(A,hn),d(R,dn)),re.svg===!0&&(d(A,dt),d(R,kt),d(R,Ue)),re.svgFilters===!0&&(d(A,gt),d(R,kt),d(R,Ue)),re.mathMl===!0&&(d(A,ft),d(R,gn),d(R,Ue))),o.ADD_TAGS&&(A===wt&&(A=Y(A)),d(A,o.ADD_TAGS,v)),o.ADD_ATTR&&(R===Et&&(R=Y(R)),d(R,o.ADD_ATTR,v)),o.ADD_URI_SAFE_ATTR&&d(Ze,o.ADD_URI_SAFE_ATTR,v),o.FORBID_CONTENTS&&(ie===Lt&&(ie=Y(ie)),d(ie,o.FORBID_CONTENTS,v)),Ke&&(A["#text"]=!0),Q&&d(A,["html","head","body"]),A.table&&(d(A,["tbody"]),delete ce.tbody),o.TRUSTED_TYPES_POLICY){if(typeof o.TRUSTED_TYPES_POLICY.createHTML!="function")throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof o.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=o.TRUSTED_TYPES_POLICY,Z=S.createHTML("")}else S===void 0&&(S=Fr(w,n)),S!==null&&typeof Z=="string"&&(Z=S.createHTML(""));P&&P(o),se=o}},Dt=d({},[...dt,...gt,...Lr]),Nt=d({},[...ft,...Mr]),$n=function(o){let p=K(o);(!p||!p.tagName)&&(p={namespaceURI:oe,tagName:"template"});let h=Be(o.tagName),_=Be(p.tagName);return Ve[o.namespaceURI]?o.namespaceURI===Re?p.namespaceURI===H?h==="svg":p.namespaceURI===ve?h==="svg"&&(_==="annotation-xml"||Ie[_]):!!Dt[h]:o.namespaceURI===ve?p.namespaceURI===H?h==="math":p.namespaceURI===Re?h==="math"&&Le[_]:!!Nt[h]:o.namespaceURI===H?p.namespaceURI===Re&&!Le[_]||p.namespaceURI===ve&&!Ie[_]?!1:!Nt[h]&&(On[h]||!Dt[h]):!!(ue==="application/xhtml+xml"&&Ve[o.namespaceURI]):!1},B=function(o){ke(e.removed,{element:o});try{K(o).removeChild(o)}catch{Te(o)}},ae=function(o,p){try{ke(e.removed,{attribute:p.getAttributeNode(o),from:p})}catch{ke(e.removed,{attribute:null,from:p})}if(p.removeAttribute(o),o==="is")if(ne||Se)try{B(p)}catch{}else try{p.setAttribute(o,"")}catch{}},$t=function(o){let p=null,h=null;if(Ye)o="<remove></remove>"+o;else{let E=un(o,/^[\r\n\t ]+/);h=E&&E[0]}ue==="application/xhtml+xml"&&oe===H&&(o='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+o+"</body></html>");let _=S?S.createHTML(o):o;if(oe===H)try{p=new k().parseFromString(_,ue)}catch{}if(!p||!p.documentElement){p=X.createDocument(oe,"template",null);try{p.documentElement.innerHTML=Xe?Z:_}catch{}}let I=p.body||p.documentElement;return o&&h&&I.insertBefore(r.createTextNode(h),I.childNodes[0]||null),oe===H?Sn.call(p,Q?"html":"body")[0]:Q?p.documentElement:I},zt=function(o){return V.call(o.ownerDocument||o,o,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Je=function(o){return o instanceof f&&(typeof o.nodeName!="string"||typeof o.textContent!="string"||typeof o.removeChild!="function"||!(o.attributes instanceof g)||typeof o.removeAttribute!="function"||typeof o.setAttribute!="function"||typeof o.namespaceURI!="string"||typeof o.insertBefore!="function"||typeof o.hasChildNodes!="function")},Ut=function(o){return typeof l=="function"&&o instanceof l};function G(m,o,p){ze(m,h=>{h.call(e,o,p,se)})}let Bt=function(o){let p=null;if(G(M.beforeSanitizeElements,o,null),Je(o))return B(o),!0;let h=v(o.nodeName);if(G(M.uponSanitizeElement,o,{tagName:h,allowedTags:A}),Ee&&o.hasChildNodes()&&!Ut(o.firstElementChild)&&O(/<[/\w!]/g,o.innerHTML)&&O(/<[/\w!]/g,o.textContent)||o.nodeType===_e.progressingInstruction||Ee&&o.nodeType===_e.comment&&O(/<[/\w]/g,o.data))return B(o),!0;if(!A[h]||ce[h]){if(!ce[h]&&Ht(h)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h)))return!1;if(Ke&&!ie[h]){let _=K(o)||o.parentNode,I=we(o)||o.childNodes;if(I&&_){let E=I.length;for(let $=E-1;$>=0;--$){let q=N(I[$],!0);q.__removalCount=(o.__removalCount||0)+1,_.insertBefore(q,le(o))}}}return B(o),!0}return o instanceof c&&!$n(o)||(h==="noscript"||h==="noembed"||h==="noframes")&&O(/<\/no(script|embed|frames)/i,o.innerHTML)?(B(o),!0):(te&&o.nodeType===_e.text&&(p=o.textContent,ze([Fe,He,Ge],_=>{p=be(p,_," ")}),o.textContent!==p&&(ke(e.removed,{element:o.cloneNode()}),o.textContent=p)),G(M.afterSanitizeElements,o,null),!1)},Ft=function(o,p,h){if(Rt&&(p==="id"||p==="name")&&(h in r||h in Nn))return!1;if(!(We&&!qe[p]&&O(vn,p))){if(!(St&&O(Rn,p))){if(!R[p]||qe[p]){if(!(Ht(o)&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,o)||T.tagNameCheck instanceof Function&&T.tagNameCheck(o))&&(T.attributeNameCheck instanceof RegExp&&O(T.attributeNameCheck,p)||T.attributeNameCheck instanceof Function&&T.attributeNameCheck(p))||p==="is"&&T.allowCustomizedBuiltInElements&&(T.tagNameCheck instanceof RegExp&&O(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h))))return!1}else if(!Ze[p]){if(!O(Tt,be(h,_t,""))){if(!((p==="src"||p==="xlink:href"||p==="href")&&o!=="script"&&Ar(h,"data:")===0&&Mt[o])){if(!(At&&!O(In,be(h,_t,"")))){if(h)return!1}}}}}}return!0},Ht=function(o){return o!=="annotation-xml"&&un(o,Ln)},Gt=function(o){G(M.beforeSanitizeAttributes,o,null);let{attributes:p}=o;if(!p||Je(o))return;let h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:R,forceKeepAttr:void 0},_=p.length;for(;_--;){let I=p[_],{name:E,namespaceURI:$,value:q}=I,he=v(E),et=q,L=E==="value"?et:vr(et);if(h.attrName=he,h.attrValue=L,h.keepAttr=!0,h.forceKeepAttr=void 0,G(M.uponSanitizeAttribute,o,h),L=h.attrValue,It&&(he==="id"||he==="name")&&(ae(E,o),L=Mn+L),Ee&&O(/((--!?|])>)|<\/(style|title)/i,L)){ae(E,o);continue}if(h.forceKeepAttr)continue;if(!h.keepAttr){ae(E,o);continue}if(!vt&&O(/\/>/i,L)){ae(E,o);continue}te&&ze([Fe,He,Ge],Wt=>{L=be(L,Wt," ")});let qt=v(o.nodeName);if(!Ft(qt,he,L)){ae(E,o);continue}if(S&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!$)switch(w.getAttributeType(qt,he)){case"TrustedHTML":{L=S.createHTML(L);break}case"TrustedScriptURL":{L=S.createScriptURL(L);break}}if(L!==et)try{$?o.setAttributeNS($,E,L):o.setAttribute(E,L),Je(o)?B(o):pn(e.removed)}catch{ae(E,o)}}G(M.afterSanitizeAttributes,o,null)},zn=function m(o){let p=null,h=zt(o);for(G(M.beforeSanitizeShadowDOM,o,null);p=h.nextNode();)G(M.uponSanitizeShadowNode,p,null),Bt(p),Gt(p),p.content instanceof a&&m(p.content);G(M.afterSanitizeShadowDOM,o,null)};return e.sanitize=function(m){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,h=null,_=null,I=null;if(Xe=!m,Xe&&(m="<!-->"),typeof m!="string"&&!Ut(m))if(typeof m.toString=="function"){if(m=m.toString(),typeof m!="string")throw xe("dirty is not a string, aborting")}else throw xe("toString is not a function");if(!e.isSupported)return m;if(je||Qe(o),e.removed=[],typeof m=="string"&&(pe=!1),pe){if(m.nodeName){let q=v(m.nodeName);if(!A[q]||ce[q])throw xe("root node is forbidden and cannot be sanitized in-place")}}else if(m instanceof l)p=$t("<!---->"),h=p.ownerDocument.importNode(m,!0),h.nodeType===_e.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?p=h:p.appendChild(h);else{if(!ne&&!te&&!Q&&m.indexOf("<")===-1)return S&&Ae?S.createHTML(m):m;if(p=$t(m),!p)return ne?null:Ae?Z:""}p&&Ye&&B(p.firstChild);let E=zt(pe?m:p);for(;_=E.nextNode();)Bt(_),Gt(_),_.content instanceof a&&zn(_.content);if(pe)return m;if(ne){if(Se)for(I=En.call(p.ownerDocument);p.firstChild;)I.appendChild(p.firstChild);else I=p;return(R.shadowroot||R.shadowrootmode)&&(I=An.call(i,I,!0)),I}let $=Q?p.outerHTML:p.innerHTML;return Q&&A["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&O(_n,p.ownerDocument.doctype.name)&&($="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+$),te&&ze([Fe,He,Ge],q=>{$=be($,q," ")}),S&&Ae?S.createHTML($):$},e.setConfig=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Qe(m),je=!0},e.clearConfig=function(){se=null,je=!1},e.isValidAttribute=function(m,o,p){se||Qe({});let h=v(m),_=v(o);return Ft(h,_,p)},e.addHook=function(m,o){typeof o=="function"&&ke(M[m],o)},e.removeHook=function(m,o){if(o!==void 0){let p=Er(M[m],o);return p===-1?void 0:Sr(M[m],p,1)[0]}return pn(M[m])},e.removeHooks=function(m){M[m]=[]},e.removeAllHooks=function(){M=kn()},e}var wn=Tn();var yt=class{constructor(t){this.isVisible=!1;this.conversation=[];this.container=null;this.hasEmbeddedApiKey=!1;this._eval_results=[];this.totalTokenUsage={input_tokens:0,output_tokens:0,cache_creation_input_tokens:0,cache_read_input_tokens:0};this.modelPricing={"claude-sonnet-4-20250514":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-sonnet-20241022":{input:3,output:15,cache_write:3.75,cache_read:.3},"claude-3-5-haiku-20241022":{input:.8,output:4,cache_write:1,cache_read:.08},"claude-opus-4-20250514":{input:15,output:75,cache_write:18.75,cache_read:1.5}};t?(this.apiKey=t,this.hasEmbeddedApiKey=!0):(this.apiKey=localStorage.getItem("bookmarklet-agent-api-key")||"",this.hasEmbeddedApiKey=!1),this.selectedModel=localStorage.getItem("bookmarklet-agent-model")||"claude-sonnet-4-20250514"}init(){this.createUI(),this.show()}renderMarkdown(t){try{let e=b.parse(t);return wn.sanitize(e)}catch(e){return console.warn("Markdown rendering failed:",e),t.replace(/\n/g,"<br>")}}createUI(){this.container||(this.container=document.createElement("div"),this.container.id="bookmarklet-agent",this.container.innerHTML=`
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
    `,this.addStyles(),this.addEventListeners(),document.body.appendChild(this.container))}addEventListeners(){if(!this.container)return;this.container.addEventListener("click",e=>{switch(e.target.getAttribute("data-action")){case"close":this.hide();break;case"save-session":this.saveApiKey(!1);break;case"save-persistent":this.saveApiKey(!0);break;case"send":this.sendMessage();break}}),this.container.addEventListener("change",e=>{switch(e.target.getAttribute("data-action")){case"change-model":this.changeModel();break}}),this.container.querySelector("#user-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.sendMessage())}),this.addDragFunctionality()}addDragFunctionality(){if(!this.container)return;let t=this.container.querySelector(".agent-header");if(!t)return;let e=!1,r=0,i=0,n=0,a=0;t.addEventListener("mousedown",s=>{let l=s.target;l.tagName==="BUTTON"||l.tagName==="INPUT"||l.classList.contains("token-usage")||l.closest(".token-usage")||(e=!0,n=s.clientX-this.container.offsetLeft,a=s.clientY-this.container.offsetTop)}),document.addEventListener("mousemove",s=>{if(!e||!this.container)return;s.preventDefault(),r=s.clientX-n,i=s.clientY-a;let l=window.innerWidth-this.container.offsetWidth,c=window.innerHeight-this.container.offsetHeight;r=Math.max(0,Math.min(r,l)),i=Math.max(0,Math.min(i,c)),this.container.style.left=r+"px",this.container.style.top=i+"px",this.container.style.right="auto"}),document.addEventListener("mouseup",()=>{e=!1})}addStyles(){if(document.getElementById("bookmarklet-agent-styles"))return;let t=document.createElement("style");t.id="bookmarklet-agent-styles",t.textContent=`
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
    `,document.head.appendChild(t)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0)}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1)}toggle(){this.isVisible?this.hide():this.show()}get eval_results(){return this._eval_results}calculateCost(t,e){let r=this.modelPricing[e];if(!r)return 0;let i=t.input_tokens/1e6*r.input,n=t.output_tokens/1e6*r.output,a=(t.cache_creation_input_tokens||0)/1e6*r.cache_write,s=(t.cache_read_input_tokens||0)/1e6*r.cache_read;return i+n+a+s}updateTokenUsage(t){this.totalTokenUsage.input_tokens+=t.input_tokens,this.totalTokenUsage.output_tokens+=t.output_tokens,this.totalTokenUsage.cache_creation_input_tokens+=t.cache_creation_input_tokens||0,this.totalTokenUsage.cache_read_input_tokens+=t.cache_read_input_tokens||0}formatCost(t){return t<.01?`$${(t*100).toFixed(4)}\xA2`:`$${t.toFixed(4)}`}updateTokenDisplay(){let t=document.getElementById("token-usage"),e=document.getElementById("token-tooltip");if(!t||!e)return;let r=this.calculateCost(this.totalTokenUsage,this.selectedModel),i=this.totalTokenUsage.input_tokens+this.totalTokenUsage.output_tokens;if(i===0){t.childNodes[0].textContent="",e.textContent="";return}let n=t.childNodes[0];n?n.textContent=`Tokens: ${i.toLocaleString()} | Cost: ${this.formatCost(r)}`:t.insertBefore(document.createTextNode(`Tokens: ${i.toLocaleString()} | Cost: ${this.formatCost(r)}`),e);let a=this.modelPricing[this.selectedModel];if(a){let s=[`Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} \xD7 $${a.input}/M = ${this.formatCost(this.totalTokenUsage.input_tokens/1e6*a.input)}`,`Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} \xD7 $${a.output}/M = ${this.formatCost(this.totalTokenUsage.output_tokens/1e6*a.output)}`];this.totalTokenUsage.cache_creation_input_tokens&&s.push(`Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} \xD7 $${a.cache_write}/M = ${this.formatCost(this.totalTokenUsage.cache_creation_input_tokens/1e6*a.cache_write)}`),this.totalTokenUsage.cache_read_input_tokens&&s.push(`Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} \xD7 $${a.cache_read}/M = ${this.formatCost(this.totalTokenUsage.cache_read_input_tokens/1e6*a.cache_read)}`),e.textContent=s.join(`
`)}}handleUnauthorized(){this.apiKey="",this.hasEmbeddedApiKey||localStorage.removeItem("bookmarklet-agent-api-key");let t=document.querySelector(".api-key-section");t&&(t.style.display="block");let e=document.getElementById("api-key-input");e&&(e.value="")}saveApiKey(t=!1){let e=document.getElementById("api-key-input");if(this.apiKey=e.value.trim(),t&&!this.hasEmbeddedApiKey&&localStorage.setItem("bookmarklet-agent-api-key",this.apiKey),this.apiKey){let r=document.querySelector(".api-key-section");r&&(r.style.display="none")}}changeModel(){let t=document.getElementById("model-select");this.selectedModel=t.value,localStorage.setItem("bookmarklet-agent-model",this.selectedModel)}showThinking(){this.hideThinking();let t=document.getElementById("chat-messages");if(!t)return;let e=document.createElement("div");e.id="thinking-indicator",e.className="thinking",e.innerHTML=`
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}hideThinking(){let t=document.getElementById("thinking-indicator");t&&t.remove()}async sendMessage(){let t=document.getElementById("user-input"),e=t.value.trim();if(e){if(!this.apiKey){alert("Please enter your Anthropic API key first");return}t.value="",this.addMessage("user",e),this.showThinking();try{await this.runAgentLoop(e)}catch(r){this.addMessage("assistant",`Error: ${r.message}`)}finally{this.hideThinking()}}}async runAgentLoop(t){let e=this.getPageContext(),r=[...this.conversation.filter(i=>i.role!=="system"),{role:"user",content:t}];for(;;){let i=await this.callAnthropicAPIWithMessages(r,e),n="",a=[];for(let l of i.content)l.type==="text"?n+=l.text:l.type==="tool_use"&&a.push({id:l.id,name:l.name,input:l.input});if(r.push({role:"assistant",content:i.content}),n.trim()&&this.addMessage("assistant",n),a.length===0)break;let s=[];for(let l of a){let c=await this.handleToolCall(l);s.push({type:"tool_result",tool_use_id:c.tool_use_id,content:c.content,is_error:c.is_error});let u=`\u{1F527} **${l.name}**
\`\`\`javascript
${JSON.stringify(l.input,null,2)}
\`\`\``,g=c.is_error?`\u274C **Error:**
${c.content}`:`\u2705 **Result:**
${c.content}`,f=`${u}

${g}`;this.addMessage("assistant",f,!0)}r.push({role:"user",content:s})}this.conversation=r.map(i=>({role:i.role,content:typeof i.content=="string"?i.content:JSON.stringify(i.content)}))}addMessage(t,e,r=!1){let i=document.getElementById("chat-messages");if(!i)return;let n=document.createElement("div");if(n.className=`message ${t}`,r){let a=e.split(`
`),s=a.slice(0,2).join(`
`),l=a.length>2;n.innerHTML=`
        <div class="tool-result-preview">${this.escapeHtml(s)}</div>
        ${l?`
          <div class="tool-result-full" style="display: none;">${this.escapeHtml(e)}</div>
          <button class="expand-tool-result" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">\u{1F4CB} Show Full Result</button>
        `:""}
      `}else if(t==="assistant"){let a=this.renderMarkdown(e);n.innerHTML=a}else n.textContent=e;i.appendChild(n),i.scrollTop=i.scrollHeight,this.conversation.push({role:t,content:e})}escapeHtml(t){let e=document.createElement("div");return e.textContent=t,e.innerHTML}getPageContext(){return{url:window.location.href,title:document.title,selectedText:window.getSelection()?.toString()||"",forms:Array.from(document.forms).map(t=>({action:t.action,method:t.method,elements:Array.from(t.elements).map(e=>{let r=e;return{name:r.name,type:r.type,value:r.value}})})),headings:Array.from(document.querySelectorAll("h1, h2, h3")).map(t=>t.textContent?.trim()||"").slice(0,10),links:Array.from(document.querySelectorAll("a[href]")).map(t=>({text:t.textContent?.trim()||"",href:t.href})).slice(0,20)}}async callAnthropicAPIWithMessages(t,e){let r=[{name:"eval_js",description:"Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",input_schema:{type:"object",properties:{code:{type:"string",description:"JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions."}},required:["code"]}}],i=`You are a helpful web agent that can analyze and interact with web pages using tools.
    
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

Be concise and helpful. Always use the eval_js tool when the user asks you to interact with the page.`;try{let n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.selectedModel,max_tokens:1e3,system:[{type:"text",text:i,cache_control:{type:"ephemeral"}}],tools:r,messages:t.map((s,l)=>l===t.length-1&&s.role==="user"?{...s,content:typeof s.content=="string"?[{type:"text",text:s.content,cache_control:{type:"ephemeral"}}]:Array.isArray(s.content)?s.content.map((c,u)=>u===s.content.length-1?{...c,cache_control:{type:"ephemeral"}}:c):s.content}:s)})});if(!n.ok)throw n.status===401?(this.handleUnauthorized(),new Error("Invalid API key. Please enter a valid Anthropic API key.")):new Error(`API request failed: ${n.status}`);let a=await n.json();if(a.usage){this.updateTokenUsage(a.usage),this.updateTokenDisplay();let s=this.calculateCost(a.usage,this.selectedModel);console.log(`Request cost: ${this.formatCost(s)}, Total cost: ${this.formatCost(this.calculateCost(this.totalTokenUsage,this.selectedModel))}`)}return a}catch(n){throw n instanceof TypeError&&n.message.includes("fetch")?new Error(`CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`):n}}async handleToolCall(toolCall){try{switch(toolCall.name){case"eval_js":let code=toolCall.input.code,result=eval(code),resultString=String(result||"Code executed successfully"),maxLength=10*1024;if(resultString.length>maxLength){let t=this._eval_results.length;this._eval_results.push(result);let e=resultString.substring(0,maxLength);return{tool_use_id:toolCall.id,content:`${e}...

[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${t}]]`}}return{tool_use_id:toolCall.id,content:resultString};default:return{tool_use_id:toolCall.id,content:`Unknown tool: ${toolCall.name}`,is_error:!0}}}catch(t){return{tool_use_id:toolCall.id,content:`Error: ${t.message}`,is_error:!0}}}};window.bookmarkletAgent=new yt(window.BOOKMARKLET_API_KEY);})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE *)
*/
