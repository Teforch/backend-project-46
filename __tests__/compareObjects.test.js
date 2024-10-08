import compareObjects from '../src/compareObjects.js'

let obj1, obj2
beforeAll(() => {
    obj1 = JSON.parse(`{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}`)
    obj2 = JSON.parse(`{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}`)
})
test('compareObjects', () => {
    const Obj1 = JSON.parse(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`)

    const Obj2 = JSON.parse(`{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}`)
    const formatedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

    expect(compareObjects(Obj1, Obj2)).toEqual(formatedObj)
})

test('compareObjects with children', () => {
    const formatedObj = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
    expect(compareObjects(obj1, obj2)).toEqual(formatedObj)
})
//test('compareObjects plain format', () => {
//    const formatedResult = `
//Property 'common.follow' was added with value: false
//Property 'common.setting2' was removed
//Property 'common.setting3' was updated. From true to null
//Property 'common.setting4' was added with value: 'blah blah'
//Property 'common.setting5' was added with value: [complex value]
//Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
//Property 'common.setting6.ops' was added with value: 'vops'
//Property 'group1.baz' was updated. From 'bas' to 'bars'
//Property 'group1.nest' was updated. From [complex value] to 'str'
//Property 'group2' was removed
//Property 'group3' was added with value: [complex value]`
//    expect(compareObjects(obj1, obj2, 'plain')).toEqual(formatedResult)
//})
