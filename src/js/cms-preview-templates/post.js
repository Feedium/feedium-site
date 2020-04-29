import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const {entry, widgetFor, getAsset} = this.props;
    const cover = getAsset(entry.getIn(["data", "header", "cover", "coverIMG"]));
    const coverSrc = entry.getIn(["data", "header", "cover", "coverSrc"]);
    const coverLnk = entry.getIn(["data", "header", "cover", "coverLnk"]);
    const summary = entry.getIn(["data", "header", "summary"]);
    const coverVisibility = entry.getIn(["data", "config", "coverVisibility"]);
    const summaryVisibility = entry.getIn(["data", "config", "summaryVisibility"]);
    const authorVisibility = entry.getIn(["data", "config", "authorVisibility"]);

    return <div className="single">
      <div className="main">
        <div className="main-head">
          <div className="cleafix"></div>
          <div className="main-title">
            <h1 className="post-title">{ entry.getIn(["data", "title"])}</h1>
            <h3 className="post-subtitle">{ entry.getIn(["data", "subtitle"])}</h3>
            { authorVisibility === "true" && (
              <div className="post-author ">
                <div>
                  <div className="avatar">
                    <img className="asyncImage" src="/assets/img/avatar.png" />
                  </div>
                  <span>
                    <p><strong>{ entry.getIn(["data", "author"])}</strong></p>
                    <p className="date">{ format(entry.getIn(["data", "date"]), "ddd, MMM D, YYYY") }</p>
                  </span>
                </div>
              </div>
            )}

            { summaryVisibility === "true" && (
              <div className="post-summary">
                <p>{ summary }</p>
              </div>
            )}
            { coverVisibility === "true" && (
              <div className="post-cover">
                <div>
                  <img className="asyncImage" src={`${ cover }`} />
                  { coverSrc && (
                    <span><a href={coverLnk}>{coverSrc}</a></span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main-content" id="content">{ widgetFor("body") }</div>
        <div className="main-footer">
          <div className="main-footer-tagline">
            <div>
              <ul className="footer-tags">
                <li><a>#topic</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
