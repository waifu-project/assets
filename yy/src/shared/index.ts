import { ABOUT_DATA_KEY } from "@/config/keys"
import fetch from 'unfetch'

enum SetCacheDataType {
  about,
}

class CacheMap {

  _map = new Map()

  push<T>(_key: string, _value: T) {
    this._map.set(_key, _value)
  }

  get<T>(_key: string): T {
    return this._map.get(_key) as T
  }

  has(_key: string): boolean {
    return this._map.has(_key)
  }

  setValue(action: SetCacheDataType, value: any) {
    switch (action) {
      case SetCacheDataType.about:
        this.push(ABOUT_DATA_KEY, value)
        break
    }
  }

  setAboutData(value: string) {
    this.setValue(SetCacheDataType.about, value)
  }

  async getAboutData() {
    const value = this.get<string>(ABOUT_DATA_KEY) || ""
    if (value == "") {
      try { 
        const url = `https://raw.githubusercontent.com/waifu-project/movie/dev/README.md`
        let data = await (await fetch(url)).text()
        data = data.split("\n").slice(3).join('\n')
        this.setAboutData(data)
        return data;
      } catch (error) {
        console.log("get about data error: ", error)
      }
    }
    return value
  }
}

const cacheMap = new CacheMap();

export default cacheMap
export {
  SetCacheDataType
}