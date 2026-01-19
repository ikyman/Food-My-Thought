import { useQueryDjangoBackendContext } from '../QueryDjangoBackendContext/QueryDjangoBackendContext'
import {LarderRequestContext} from './LarderRequestContext'


// this is quite small. Why do I need it? the functions are one-liners!
export const LarderRequestContextProvider = ({children}) => {
    const { getNonHTML } = useQueryDjangoBackendContext();

    const getMyLarder = async () => {
      const retObj = await getNonHTML("/larders/url-extension").json()

      return retObj

    }
    const getRandomLarder = async ( randomnessLevel) => {
      const retObj = await getNonHTML("/larders/url-extension?randomness-level=" + randomnessLevel).json()
      return retObj

    }

	return (
    <LarderRequestContext.Provider
      value={{ getMyLarder, getRandomLarder}}
    >
      {children}
    </LarderRequestContext.Provider>
  );
}