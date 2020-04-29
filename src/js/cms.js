import React from "react";
import CMS from "netlify-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.css";

import PostPreview from "./cms-preview-templates/post";

CMS.registerEditorComponent(
  {
    id: "image",
    label: "Image",
    fields: [
      {name: "src", label: "src", widget: "image"},
      {name: "class", label: "class", widget: "string"},
      {name: "alt", label: "alt", widget: "string"},
    ],
    pattern:  /(?:\{\{\<\ img\ src\=\")(\S+)(?:\"\ class\=\")(\S+)(?:\"\ alt\=\")([\s\S]+)" >}}/,
    fromBlock: function(match) {
      return {src: match[1], class: match[2], alt: match[3]};
    },
    toBlock: function(obj) {
      return '{{< img src="' + obj.src + '" class="' + obj.class + '" alt="' + obj.alt + '" >}}';
    },
    toPreview: function(obj) {
      return (
        '<img src="' + obj.src + '" alt="' + obj.alt + '" class="asyncImage ' + obj.class + '" />'
      );
    }
  }
);

CMS.registerEditorComponent(
  {
    id: "app",
    label: "App",
    fields: [
      {name: "name",    label: "Name",         widget: "string"},
      {name: "avatar",  label: "Image",         widget: "image"},
      {name: "link",    label: "Tweet Link",      widget: "string"},
    ],
    pattern:  /(?:\{\{\<\ app\ name\=\")([\s\S]+)(?:\"\ avatar\=\")([\s\S]+)(?:\"\ link\=\")([\s\S]+)" >}}/,
    fromBlock: function(match) {
      return {name: match[1], avatar: match[2], link: match[3]};
    },
    toBlock: function(obj) {
      return '{{< app name="' + obj.name + '" avatar="' + obj.avatar + '" link="' + obj.link + '" >}}';
    },
    toPreview: function(obj) {
      return (
        `<blockquote class="twitter-tweet" align="center">
          <a href="${obj.link}">${obj.name}</a>
        </blockquote>`
      );
    }
  }
);

CMS.registerEditorComponent(
  {
    id: "tweett",
    label: "Tweet.T",
    fields: [
      {name: "dir",     label: "Tweet Direction", widget: "select", options: ["rtl", "ltr"]},
      {name: "id",      label: "User ID",         widget: "string"},
      {name: "user",    label: "User Name",       widget: "string"},
      {name: "avatar",  label: "User Avatar",     widget: "image"},
      {name: "text",    label: "Tweet Text",      widget: "text"},
      {name: "link",    label: "Tweet Link",      widget: "string"},
      {name: "date",    label: "Tweet Date",      widget: "string"}
    ],
    pattern:  /(?:\{\{\<\ tweet\ dir\=\")([\s\S]+)(?:\"\ id\=\")([\s\S]+)(?:\"\ user\=\")([\s\S]+)(?:\"\ avatar\=\")([\s\S]+)(?:\"\ text\=\")([\s\S]+)(?:\"\ link\=\")([\s\S]+)(?:\"\ date\=\")([\s\S]+)" >}}/,
    fromBlock: function(match) {
      return {dir: match[1], id: match[2], user: match[3], avatar: match[4], text: match[5], link: match[6], date: match[7]};
    },
    toBlock: function(obj) {
      return '{{< tweet dir="' + obj.dir + '" id="' + obj.id + '" user="' + obj.user + '" avatar="' + obj.avatar + '" text="' + obj.text + '" link="' + obj.link + '" date="' + obj.date + '" >}}';
    },
    toPreview: function(obj) {
      return (
        `<blockquote class="twitter-tweet" align="center">
          <p lang="fa" dir="rtl">${obj.text}</p> ~ ${obj.user}<a href="${obj.link}"></a>
        </blockquote>`
      );
    }
  }
);

CMS.registerEditorComponent(
  {
    id: "tweeti",
    label: "Tweet.I",
    fields: [
      {name: "dir",     label: "Tweet Direction", widget: "select", options: ["rtl", "ltr"]},
      {name: "id",      label: "User ID",         widget: "string"},
      {name: "user",    label: "User Name",       widget: "string"},
      {name: "avatar",  label: "User Avatar",     widget: "image"},
      {name: "text",    label: "Tweet Text",      widget: "text"},
      {name: "image",   label: "Tweet Image",     widget: "image"},
      {name: "link",    label: "Tweet Link",      widget: "string"},
      {name: "date",    label: "Tweet Date",      widget: "string"}
    ],
    pattern:  /(?:\{\{\<\ tweet\ dir\=\")([\s\S]+)(?:\"\ id\=\")([\s\S]+)(?:\"\ user\=\")([\s\S]+)(?:\"\ avatar\=\")([\s\S]+)(?:\"\ text\=\")([\s\S]+)(?:\"\ link\=\")([\s\S]+)(?:\"\ img\=\")([\s\S]+)(?:\"\ date\=\")([\s\S]+)" >}}/,
    fromBlock: function(match) {
      return {dir: match[1], id: match[2], user: match[3], avatar: match[4], text: match[5], link: match[6], img: match[7], date: match[8]};
    },
    toBlock: function(obj) {
      return '{{< tweet dir="' + obj.dir + '" id="' + obj.id + '" user="' + obj.user + '" avatar="' + obj.avatar + '" text="' + obj.text + '" link="' + obj.link + '" img="' + obj.img + '" date="' + obj.date + '" >}}';
    },
    toPreview: function(obj) {
      return (
        `<blockquote class="twitter-tweet" align="center">
          <p lang="fa" dir="rtl">${obj.text}</p> ~ ${obj.user}<a href="${obj.link}"></a>
        </blockquote>`
      );
    }
  }
);


CMS.registerEditorComponent(
  {
    id: "tweetv",
    label: "Tweet.V",
    fields: [
      {name: "dir",     label: "Tweet Direction", widget: "select", options: ["rtl", "ltr"]},
      {name: "id",      label: "User ID",         widget: "string"},
      {name: "user",    label: "User Name",       widget: "string"},
      {name: "avatar",  label: "User Avatar",     widget: "image"},
      {name: "text",    label: "Tweet Text",      widget: "text"},
      {name: "video",   label: "Tweet video",     widget: "image"},
      {name: "poster",  label: "Video Poster",    widget: "image"},
      {name: "link",    label: "Tweet Link",      widget: "string"},
      {name: "date",    label: "Tweet Date",      widget: "string"}
    ],
    pattern:  /(?:\{\{\<\ tweet\ dir\=\")([\s\S]+)(?:\"\ id\=\")([\s\S]+)(?:\"\ user\=\")([\s\S]+)(?:\"\ avatar\=\")([\s\S]+)(?:\"\ text\=\")([\s\S]+)(?:\"\ link\=\")([\s\S]+)(?:\"\ video\=\")([\s\S]+)(?:\"\ poster\=\")([\s\S]+)(?:\"\ date\=\")([\s\S]+)" >}}/,
    fromBlock: function(match) {
      return {dir: match[1], id: match[2], user: match[3], avatar: match[4], text: match[5], link: match[6], video: match[7], poster: match[8], date: match[9]};
    },
    toBlock: function(obj) {
      return '{{< tweet dir="' + obj.dir + '" id="' + obj.id + '" user="' + obj.user + '" avatar="' + obj.avatar + '" text="' + obj.text + '" link="' + obj.link + '" video="' + obj.video + '" poster="' + obj.poster + '" date="' + obj.date + '" >}}';
    },
    toPreview: function(obj) {
      return (
        `<blockquote class="twitter-tweet" align="center">
          <p lang="fa" dir="rtl">${obj.text}</p> ~ ${obj.user}<a href="${obj.link}"></a>
        </blockquote>`
      );
    }
  }
);

CMS.registerEditorComponent(
  {
    id: "youtube",
    label: "Youtube",
    fields: [{name: "id", label: "videoID", widget: "string"}],
    pattern:  /(?:\{\{\<\ youtube\ id\=\")(\S+)" >}}/,
    fromBlock: function(match) {return {id: match[1]};},
    toBlock: function(obj) {return '{{< youtube id="' + obj.id + '" >}}';},
    toPreview: function(obj) {
      return (
        `<div 
          class="embed-container" 
          style="
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;">
            <iframe 
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;"
              src="https://www.youtube-nocookie.com/embed/${obj.id}controls=0?rel=0" 
              frameborder="0" 
              poster="/uploads/cover-default.png" 
              allowfullscreen 
              sandbox="allow-scripts allow-same-origin allow-presentation">
            </iframe>
        </div>`
      );
    }
  }
);

CMS.registerPreviewStyle(styles, {raw: true});

CMS.registerPreviewTemplate("posts", PostPreview);

CMS.init();
