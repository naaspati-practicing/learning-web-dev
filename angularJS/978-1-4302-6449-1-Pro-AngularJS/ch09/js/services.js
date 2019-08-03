function days() {
    this.today = new Date().getDay();
    this.tomorrow = (this.today + 1) % 7;
}

module.exports = [days];