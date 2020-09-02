import { clearKeyMapping, setKeyMapping, getKeyMapping, getKeyboards } from "./api"

const mapping = {
  // A: 'B',
  // B: 'A',
  // 'Left Arrow': 'Right Arrow',
  // 'Right Arrow': 'Left Arrow',
  'Escape': 'Caps Lock',
  'Caps Lock': 'Escape',
}

const keyboardProducetId = '0x2039';

(async () => {
  // await clearKeyMapping(keyboardProducetId)

  // const out = await setKeyMapping(keyboardProducetId, mapping)
  // console.log(out)

  // const kp = await getKeyMapping(keyboardProducetId)
  // console.log(kp)
  const keyboards = await getKeyboards()
  console.log(keyboards)
})()
