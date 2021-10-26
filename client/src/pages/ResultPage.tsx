import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ShareInterface } from "../redux/interfaces/dataInterface";
import { resetProgress } from "../redux/progress";
import { RiInstagramLine, RiKakaoTalkFill } from "react-icons/ri";
import { FiImage, FiLink } from "react-icons/fi";
import "./ResultPage.scss";
import { MBTIResult } from "../utils/utils.const";
import { IP_ADDRESS, SERVER_PORT } from "../utils/utils.env";
import { MBTIResultType } from "../redux/interfaces/progressInterface";
import { AiOutlineHome } from "react-icons/ai";
import { IReducer } from "../redux";
import html2canvas from "html2canvas";

declare const window: any;

interface Props {}
const ResultPage: React.FC<Props> = (props) => {
  const { mbti } = useParams<{ mbti: MBTIResultType }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const hiddenRef = useRef<HTMLTextAreaElement>(null);
  const progress = useSelector((state: IReducer) => state.progress);

  useEffect(() => {
    if (window.Kakao?.Link) {
      window.Kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "KAIST 안 내 최애 장소",
          description: "내 최에 장소는 어디일까요?!",
          imageUrl: "logo192.png",
          link: {
            mobileWebUrl: `https://${IP_ADDRESS}:80`,
            webUrl: `https://${IP_ADDRESS}:80`,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: "결과보기",
            link: {
              mobileWebUrl: `http://${IP_ADDRESS}:80/${mbti}`,
              webUrl: `http://${IP_ADDRESS}:80/${mbti}`,
            },
          },
          {
            title: "테스트하기",
            link: {
              mobileWebUrl: `http://${IP_ADDRESS}:80/start`,
              webUrl: `http://${IP_ADDRESS}:80/start`,
            },
          },
        ],
      });
    }
  }, [window.Kakao?.Link]);

  const onShare = (where: "link" | "instagram" | "kakao") => {
    const body: ShareInterface = {
      id: progress.id,
      type: where,
    };

    fetch(`http://${IP_ADDRESS}:${SERVER_PORT}/share`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    switch (where) {
      case "link":
        if (hiddenRef.current) {
          hiddenRef.current.style.display = "block";
          hiddenRef.current.select();
          document.execCommand("Copy");
          hiddenRef.current.style.display = "none";
        }
        break;
      case "instagram":
        break;
      case "kakao":
        break;
      // 7281c5f7129e05440500f936dedee302/
    }
  };

  const downloadImage = () => {
    const container = document.getElementById("result-container");
    if (container) {
      html2canvas(container).then((canvas) => {
        onSaveAs(canvas.toDataURL("image/png"), "kaist-mbti.png");
      });
    }
  };

  const onSaveAs = (uri: string, fileName: string) => {
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* <div className="header">
        <button
          className="small-button"
          onClick={() => {
            resetProgress()(dispatch);
            history.push(".");
          }}
        >
          <AiOutlineHome />
        </button>
      </div> */}
      <span className="title" style={{ height: 100 }}>
        {"나의 KAIST 최애 장소는.."}
      </span>
      <div className="animation-fade-in" />
      <div className="result-container" id="result-container">
        <div className="result-picture"></div>
        <span className="result-title">{MBTIResult[mbti].title}</span>
        <span className="result-context">{MBTIResult[mbti].subtitle}</span>
        <span className="result-description">
          {MBTIResult[mbti].description}
        </span>
      </div>
      <div className="result-buttons">
        <textarea
          readOnly
          style={{ display: "none" }}
          value={`http://${IP_ADDRESS}:${SERVER_PORT}/${mbti}`}
          tabIndex={-1}
          ref={hiddenRef}
        />
        <div className="bottom-buttons">
          <button className="small-button" onClick={() => onShare("link")}>
            <FiLink style={{ color: "black" }} />
          </button>
          <button className="small-button" onClick={() => downloadImage()}>
            <FiImage style={{ color: "black" }} className="share-svg" />
          </button>
          <a
            className="small-button"
            id="kakao-link-btn"
            href="javascript:;"
            onClick={() => onShare("kakao")}
          >
            <RiKakaoTalkFill className="share-svg" fill={"black"} />
          </a>
          <button className="small-button" onClick={() => onShare("instagram")}>
            <RiInstagramLine style={{ color: "black" }} className="share-svg" />
          </button>
        </div>
      </div>
      <div className="home-container">
        <button
          className="home-button"
          style={{
            marginTop: "auto",
            color: "lightgray",
          }}
          onClick={() => {
            history.push(".");
          }}
        >
          <AiOutlineHome />
        </button>
      </div>
    </>
  );
};

export default ResultPage;
