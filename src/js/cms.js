import React from "react";
import CMS from "netlify-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.css";

import PostPreview from "./cms-preview-templates/post";

CMS.registerEditorComponent({
  id: "ampimg",
  label: "AMP-IMG",
  fields: [{
    name: "src",
    label: "src",
    widget: "image"
  },
  {
    name: "class",
    label: "class",
    widget: "string"
  },
  {
    name: "alt",
    label: "alt",
    widget: "string"
  }],
  pattern:  /(?:\{\{\<\ img\ src\=\")(\S+)(?:\"\ class\=\")(\S+)(?:\"\ alt\=\")(\S+)" >}}/,
  fromBlock: function(match) {
    return {
      src: match[1],
      class: match[2],
      alt: match[3]
    };
  },
  toBlock: function(obj) {
    return '{{< img src="' + obj.src + '" class="' + obj.class + '" alt="' + obj.alt + '" >}}';
  },
  toPreview: function(obj) {
    return (
      '<img src="' + obj.src + '" alt="' + obj.alt + '" class="asyncImage ' + obj.class + '" />'
    );
  }
});


CMS.registerEditorComponent({
  id: "tweet",
  label: "Tweet",
  fields: [
    {name: "id", label: "Tweet ID", widget: "string"},
    {name: "text", label: "Tweet Text", widget: "string"},
    {name: "author", label: "Tweet Author", widget: "string"}
  ],
  pattern:  /(?:\{\{\<\ tweet\ id\=\")(\S+)(?:\"\ text\=\")(\S+)(?:\"\ author\=\")(\S+)" >}}/,
  fromBlock: function(match) {
    return {
      id: match[1],
      text: match[2],
      author: match[3]
    };
  },
  toBlock: function(obj) {
    return '{{< tweet id="' + obj.id + '" text="' + obj.text + '" author="' + obj.author + '" >}}';
  },
  toPreview: function(obj) {
    return (
      '<blockquote class="twitter-tweet" data-dnt="true" align="center"><p lang="fa" dir="rtl">' + obj.text + " </p> ~ " + obj.auhor + '<a href="https://twitter.com/tweets/status/' + obj.id + '"></a></blockquote><script>function l(t) {let e = document.createElement("script"); e.type = "text/javascript", e.setAttribute("charset", "utf-8"), e.src = t,e.setAttribute("crossorigin","anonymous"),e.async = !0,document.body.appendChild(e)};l("https://platform.twitter.com/widgets.js");</script>'
    );
  }
});

CMS.registerEditorComponent({
  id: "youtube",
  label: "Youtube",
  fields: [{name: "id", label: "videoID", widget: "string"}],
  pattern:  /(?:\{\{\<\ youtube\ id\=\")(\S+) >}}/,
  fromBlock: function(match) {return {id: match[1]};},
  toBlock: function(obj) {return '{{< youtube id="' + obj.id + '" >}}';},
  toPreview: function(obj) {
    return (
      '<div class="embed-container"><iframe class="asyncImage" data-src="https://www.youtube-nocookie.com/embed/' + obj.id + '?controls=0?rel=0" frameborder="0" poster="/uploads/cover-default.png" allowfullscreen sandbox="allow-scripts allow-same-origin allow-presentation"></iframe></div>'
    );
  }
});

CMS.registerPreviewStyle(styles, {
  raw: true
});

CMS.registerPreviewTemplate("posts", PostPreview);

CMS.init();
