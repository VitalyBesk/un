<template>
  <div class="root">
    <header class="header">
      <form class="search" @submit.prevent="submit">
        <h1 class="search__title">Проверка авто по номерному знаку</h1>
        <the-mask  class="search__input" placeholder="Номерной знак авто" v-model="number" mask="AADDDDAA" :tokens="tokens"  @input="$v.number.$touch()" />
        <p class="search__error" v-if="errorResult">{{errorResult}}</p>
        <p class="search__error" v-if="$v.number.$error">Поле обязательно для заполнение</p>
      </form>
    </header>
    <main class="main">
      <div class="hint" v-if="!successResult">
        <h1 class="hint__description">Введите номерной знак автомобиля (например AA9999AI) и нажмине Enter</h1>
      </div>
      <table class="report" v-if="successResult">
        <tr class="report__row">
          <td class="report__column report__column_name">Владелец:</td>
          <td class="report__column">{{successResult.owner}}</td>
        </tr>
        <tr class="report__row">
          <td class="report__column report__column_name">Год производства:</td>
          <td class="report__column">{{successResult.year}}</td>
        </tr>
        <tr class="report__row">
          <td class="report__column report__column_name">Колличество владельцев:</td>
          <td class="report__column">{{successResult.ownersCount}}</td>
        </tr>
        <tr class="report__row">
          <td class="report__column report__column_name">Факты ДДП:</td>
          <td class="report__column report__column_name">{{successResult.crashesCount}}</td>
        </tr>
      </table>
    </main>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {required} from 'vuelidate/lib/validators'
import {TheMask} from 'vue-the-mask'

export default {

  components: {TheMask},

  computed: {
    number: {
      get () {
        return this.$store.state.number
      },
      set (value) {
        this.$store.commit('updateNumber', value);
      }
    },
    ...mapState([
      'errorResult',
      'successResult',
      'tokens'
    ])
  },

  validations: {
    number: {
      required
    }
  },

  methods: {
    submit() {
      var isValid = !this.$v.$invalid;

      this.$emit('on-validate', this.$data, isValid);
      if (isValid) {
        this.$store.dispatch('getNumber');
      }
      return isValid
    }
  }
}
</script>
