<script lang="ts">
  import chevronDown from "$assets/icons/chevron-down.svg";

  interface Props {
    faq: {
      question: string;
      answer: string;
    };
    isExpanded: boolean;
    onclick: () => void;
  }
  let { faq, isExpanded, onclick }: Props = $props();
</script>

<button class="container" class:container-expanded={isExpanded} {onclick}>
  <div class="question-and-answer">
    <p class="question mb-s">{faq.question}</p>
    <p class="answer">{faq.answer}</p>
  </div>
  <img src={chevronDown} alt="" />
</button>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid grey;
    text-align: left;
  }

  .question-and-answer {
    padding-right: 150px;
    flex-grow: 1;
  }

  .answer {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  button img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s linear;
  }

  .question {
    font-weight: 600;
  }

  .container-expanded img {
    transform: rotate(180deg);
  }

  .container-expanded .answer {
    max-height: unset;
    opacity: 1;
  }
</style>
