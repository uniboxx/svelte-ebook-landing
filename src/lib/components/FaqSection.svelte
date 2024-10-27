<script lang="ts">
  import { FaqItem, Button } from '$components';
  import { faqs } from '$assets/data';
  import twitterIcon from '$assets/icons/twitter.webp';

  let questionCurrentlyExpanded = $state(-1);

  function toggleBtn(index: number) {
    if (index === questionCurrentlyExpanded) {
      questionCurrentlyExpanded = -1;
    } else {
      questionCurrentlyExpanded = index;
    }
  }
</script>

<section class="landing-page-section">
  <h2 class="mb-l">Frequently asked questions</h2>
  <div class="faq-container">
    {#each faqs as faq, index}
      <FaqItem
        {faq}
        isExpanded={index === questionCurrentlyExpanded}
        onclick={() => toggleBtn(index)} />
    {/each}
  </div>
  <div class="additional-info mt-m">
    <Button class="mt-s">BUY NOW</Button>
    <p class="mt-m">Any other questions?</p>
    <a href="https://x.com/KIZO.ES">
      <p>
        Hit me up on twitter <img
          class="twitter-icon"
          src={twitterIcon}
          alt="twitter icon" />
      </p>
    </a>
  </div>
</section>

<style>
  .additional-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: grey;
  }

  .twitter-icon {
    width: 16px;
    height: 16px;
  }

  .additional-info a {
    text-decoration: underline;
  }
</style>
