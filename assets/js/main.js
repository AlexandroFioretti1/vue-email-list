const { createApp } = Vue;

createApp({
  data() {
    return {
      emailsToGenerate: 10,
      generationComplete: false,
      apiURL: "https://flynn.boolean.careers/exercises/api/random/mail",
      generatedEmails: [],
      errorPresent: false,
      elapsedTime: null,
    };
  },
  methods: {
    generateEmails() {
      let start = performance.now();
      for (let i = 0; i < this.emailsToGenerate; i++) {
        axios
          .get(this.apiURL)
          .then((response) => {
            this.generatedEmails.push(response.data.response);
            if (i === this.emailsToGenerate - 1) {
              this.generationComplete = true;
              this.elapsedTime = performance.now() - start;
            }
          })
          .catch((error) => {
            console.error(`You have an error: ${error.message}`);
            this.errorPresent = true;
          });
      }
    },
  },
  mounted() {
    this.generateEmails();
  },
}).mount("#app");
