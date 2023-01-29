<template>
  <ContentBar>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form>
          <div class="mb-3">
            <input type="text" id="usrname" class="form-control" placeholder="Username">
          </div>
          <div class="mb-3">
            <input type="password" id="pwd" class="form-control" placeholder="Password">
          </div>
          <div class="mb-3">
            <input type="password" id="confirmedPwd" class="form-control" placeholder="Confirm password">
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="termCheck">
              <label class="form-check-label" for="termCheck">
                By clicking this box I agree to any term of use (if any).
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </ContentBar>
</template>

<script>
import ContentBar from "@/components/ContentBar.vue";

export default {
  components: {
    ContentBar
  }
}
</script>

<style scoped>
button {
  width: 100%
}
</style>