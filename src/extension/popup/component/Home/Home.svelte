<script lang="ts">
  import { styleDefaultValue, styleNameList } from '@global';
  import { storage } from '@popup/utils/messaging';
  import type {
    ButtonEventHandler,
    InputEventHandler,
    StyleVarName,
  } from '@types';
  import HomeView from './Home.view.svelte';
  let styleValue:Record<StyleVarName, string> = structuredClone(styleDefaultValue);

  console.log(1);
  storage
    .get(styleNameList)
    .then((value: Record<StyleVarName, string>) => {
      for (const name of styleNameList) {
        styleValue[name] = value[name] ?? styleDefaultValue[name];
      }
    });

  storage.onChanged.addListener((changes) => {
    console.log({ changes });
  });

  const changeColor = async (name: StyleVarName, value: string) => {
    styleValue[name] = value;
    await storage.set({
      [name]: value,
    });
  };

  const styleChangeHandler =
    (name: StyleVarName): InputEventHandler =>
      (e) => {
        changeColor(name, e.target.value);
      };

  const addClick: ButtonEventHandler = async () => {
    const { val: prevVal } = await storage.get('val');
    await storage.set({ val: (prevVal ?? 0) + 1 });
  };
  const subClick: ButtonEventHandler = async () => {
    const { val: prevVal } = await storage.get('val');
    await storage.set({ val: (prevVal ?? 0) - 1 });
  };
  const resetClick: ButtonEventHandler = async () => {
    for (const name of styleNameList) {
      styleValue[name] = styleDefaultValue[name];
    }
    await storage.remove(styleNameList);
  };
</script>

<HomeView
  {resetClick}
  onBaseChange={styleChangeHandler('nnryv-name-base')}
  onMemberChange={styleChangeHandler('nnryv-name-member')}
  onModeratorChange={styleChangeHandler('nnryv-name-moderator')}
  baseValue={styleValue['nnryv-name-base']}
  memberValue={styleValue['nnryv-name-member']}
  moderatorValue={styleValue['nnryv-name-moderator']}
/>
