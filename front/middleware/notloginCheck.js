export default function({ store, redirect }) {
  if (!store.state.users.user_info) {
    return redirect("/");
  }
}
