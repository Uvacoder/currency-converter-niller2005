<script lang="ts">
  import Icon from '@iconify/svelte'
  import './lib/Tailwind.svelte'
  import type { ExchangeRates } from './models/exchange-rates'

  const fetchExchangeRates = (async (): Promise<ExchangeRates> => {
    const r = await fetch(`https://api.frankfurter.app/latest?from=DKK`)
    return await r.json()
  })()

  let curValue: number
  let dkkValue = 1

  $: convertedValue = +(dkkValue / curValue).toFixed(2)
</script>

<section class="flex items-center justify-center h-screen">
  <div class="flex items-center w-3/5 gap-4 p-5 rounded shadow bg-base-200">
    {#await fetchExchangeRates}
      <!-- promise is pending -->
    {:then er}
      <div class="w-full form-control">
        <div class="relative">
          <input
            bind:value={dkkValue}
            type="number"
            min="0"
            class="w-full pr-16 input input-accent input-bordered" />
          <button
            class="absolute top-0 right-0 w-16 rounded-l-none cursor-default btn btn-active btn-accent no-animation">
            DKK
          </button>
        </div>
      </div>
      <button class="btn btn-circle btn-md text-base-content btn-disabled">
        <Icon icon="fa-solid:exchange-alt" color="#ffffff" />
      </button>

      <div class="w-full form-control">
        <div class="relative">
          <input
            bind:value={convertedValue}
            disabled="disabled"
            type="number"
            class="w-full pr-16 input input-accent input-bordered" />
          <select
            bind:value={curValue}
            class="absolute top-0 right-0 max-w-xs rounded-l-none select select-bordered">
            {#each Object.keys(er.rates) as symbol}
              <option value={er.rates[symbol]}>{symbol}</option>
            {/each}

          </select>
        </div>
      </div>
    {:catch error}
      <!-- promise was rejected -->
    {/await}

  </div>
</section>
