import { GlobalModel } from './models/global.model';

export const Global: GlobalModel = {
  api: {
    maps: {
      viacep: (a: string) => `https://viacep.com.br/ws/${a}/json/`,
      googleapis: () => `https://maps.googleapis.com/maps/api/staticmap`
    }
  },
  regex: {
    date: new RegExp(/^(?:(?:0[1-9]|1[0-9]|2[0-9])[/](?:0[1-9]|1[0-2])|(?:30)[/](?!02)(?:0[1-9]|1[0-2])|(?:31)[/](?:0[13578]|1[02]))[/](?:19|20)[0-9]{2}$/),
    time: new RegExp(/^([0-1][0-9]|2[0-3]) : ([0-5][0-9])$/),
  }
}

