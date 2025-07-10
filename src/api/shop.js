const _products = [
  { 'id': 1, 'title': 'JavaScript и Node.js для веб-разработчиков', 'price': 32.45, 'inventory': 19 },
  { 'id': 2, 'title': 'Web на практике. CSS, HTML, JavaScript, MySQL, PHP для fullstack-разработчиков', 'price': 15.02, 'inventory': 20 },
  { 'id': 3, 'title': 'Java Script. Основы программирования', 'price': 15.62, 'inventory': 15 },
  { 'id': 4, 'title': '97 вещей, о которых должен знать каждый Java-программист', 'price': 16.22, 'inventory': 25 },
  { 'id': 5, 'title': 'Паттерны для начинающих программистов с примерами на JAVA', 'price': 12.01, 'inventory': 34 },
  { 'id': 6, 'title': 'От Java к Kotlin', 'price': 22.83, 'inventory': 9 },
  { 'id': 7, 'title': 'Веб-разработка с применением Node и Express', 'price': 25.24, 'inventory': 17 }
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
        ? cb()
        : errorCb()
    }, 100)
  }
}
