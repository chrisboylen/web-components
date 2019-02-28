(function() {
  const currentDocument = document.currentScript.ownerDocument;

  class PersonDetail extends HTMLElement {
    constructor() {
      super();

      this.addEventListener("click", e => {
        this.toggleCard();
      });
    }

    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      const template = currentDocument.querySelector("#person-detail-template");
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

    //creating an API function so that other components can use this to populate the component
    updatePersonDetails(userData) {
      this.render(userData);
    }

    //function to populate card
    render(userData) {
      this.shadowRoot.querySelector(".card__full-name").innerHTML =
        userData.name;
      this.shadowRoot.querySelector(".card__user-name").innerHTML =
        userData.username;
      this.shadowRoot.querySelector(".card__website").innerHTML =
        userData.website;
      this.shadowRoot.querySelector(
        ".card__address"
      ).innerHTML = `<h4>Address</h4>
        ${userData.address.suite}, <br />
        ${userData.address.street}, <br />
        ${userData.address.city}, <br />
        Zipcode: ${userData.address.zipcode}`;
    }

    toggleCard() {
      let elem = this.shadowRoot.querySelector(".card__hidden-content");
      let btn = this.shadowRoot.querySelector(".card__details-btn");
      btn.innerHTML =
        elem.getElementsByClassName.display == "none"
          ? "Less Details"
          : "More Details";
      elem.style.display = elem.style.display == "none" ? "block" : "none";
    }
  }

  customElements.define("person-detail", PersonDetail);
})();
