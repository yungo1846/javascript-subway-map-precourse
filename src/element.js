export default function Element() {
  // AppendChild를 위한 Element 생성
  this.makeElement = (element, id, text) => {
    const newElement = document.createElement(element);
    const newElementText = document.createTextNode(text);
    // 특정 element에 대한 예외처리
    if (element === "input") {
      newElement.type = "text";
      newElement.placeholder = text;
    }
    // id가 주어진 경우
    if (id !== "") {
      newElement.id = id;
    }
    newElement.appendChild(newElementText);

    return newElement;
  };

  // 기존 HTML에 Append 하기 위한 HTML container 생성
  this.makeContainer = (name) => {
    let container;
    switch (name) {
      case "station":
        container = this.makeElement("div", "", "");
        container.appendChild(this.makeElement("h4", "", "역 이름"));
        container.appendChild(
          this.makeElement("input", "station-name-input", "역 이름을 입력해주세요.")
        );
        container.appendChild(this.makeElement("button", "station-add-button", "역 추가"));
        container.appendChild(this.makeElement("h2", "", "🚉 지하철 역 목록"));
        break;

      case "result":
        container = this.makeElement("div", "result", "");
        container.appendChild(this.makeElement("h4", "", "📄 실행 결과"));
        break;

      default:
        console.log("check name again");
        break;
    }

    return container;
  };
}
