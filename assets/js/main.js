/* 
Descrizione:
Attraverso l'apposita API di Boolean https://flynn.boolean.careers/exercises/api/random/mail
generare 10 indirizzi email e stamparli in pagina all'interno di una lista.
Bonus:
Far comparire gli indirizzi email solamente quando sono stati tutti generati. 
*/

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
