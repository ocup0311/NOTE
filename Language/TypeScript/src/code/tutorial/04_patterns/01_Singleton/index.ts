// 1. singleton
;(() => {
  // 1. 範例 1
  ;(() => {
    const Singleton = (() => {
      let instance: Object

      function createInstance() {
        const object = new Object('I am the instance')
        return object
      }

      return {
        getInstance: () => {
          if (!instance) {
            instance = createInstance()
          }
          return instance
        },
      }
    })()

    const run = () => {
      const instance1 = Singleton.getInstance()
      const instance2 = Singleton.getInstance()

      console.log('Same instance? ' + (instance1 === instance2))
    }

    run()
  })()

  // 2. 範例 2
  ;(() => {
    class Singleton {
      private constructor() {}

      private static instance: Singleton = new Singleton()

      static getInstance(): Singleton {
        return this.instance
      }
    }

    const a = Singleton.getInstance()
    const b = Singleton.getInstance()
    console.log('a===b? ', a === b)
  })()

  // 3. 範例 3
  ;(() => {
    class Singleton {
      private constructor() {}

      static readonly instance: Singleton = new Singleton()
    }

    const a = Singleton.instance
    const b = Singleton.instance
    console.log('a===b? ', a === b)
  })()

  // 4. 範例 4
  ;(() => {
    class Singleton {
      private constructor(
        public readonly name: string,
        public readonly age: number
      ) {}

      private static instance: Singleton = new Singleton('Ocup', 18)

      static getInstance(): Singleton {
        return Singleton.instance
      }
    }

    const a = Singleton.getInstance()
    const b = Singleton.getInstance()
    console.log('a===b? ', a === b)
    console.log('a? ', a)
  })()
})()

// 2. Lazy Initialization in Singleton
;(() => {
  class LazySingleton {
    private constructor(
      public readonly name: string,
      public readonly age: number
    ) {}

    private static instance: LazySingleton

    static getInstance(): LazySingleton {
      if (!LazySingleton.instance) {
        LazySingleton.instance = new LazySingleton('Ocup', 18)
      }

      return LazySingleton.instance
    }
  }

  const a = LazySingleton.getInstance()
  const b = LazySingleton.getInstance()
  console.log('a===b? ', a === b)
  console.log('a? ', a)
})()
