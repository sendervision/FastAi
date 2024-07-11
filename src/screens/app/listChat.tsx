import { View, StyleSheet, Dimensions, SectionList } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { Head } from "@/components/head"
import { listAi } from "@/utils/aiList"
import { ItemListChat } from "@/components/itemListChat"
import { useNavigation } from "@react-navigation/native"
import { useModel } from "@/context/hook"

const { width, height } = Dimensions.get("window")

export function ListChatScreen({navigation}){
  const theme = useTheme()
  const useNavigationParent = useNavigation().getParent()
  const updateModel = useModel(state => state.updateModel)

  const TypeModels = new Set(listAi.map(ai => ai.model))
  const data = []
  for (let type_model of TypeModels){
    data.push({title: type_model, data: listAi.filter(ai => ai.model === type_model)})
  }

  const onNavigateToChatScreen = (item: { models: any[] }) => {
    updateModel({model: item.models[0]})
    useNavigationParent.navigate("chat", {item: item})
  }
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <Head title={"Ai"} style={{backgroundColor: theme.colors.secondary}} />
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderSectionFooter={() => <View style={{height: 10}} />}
        renderItem={({item}) => (
          <ItemListChat
            item={item}
            onNavigateToChatScreen={() => onNavigateToChatScreen(item)}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[styles.titleSection]} >
            {title}
          </Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  titleSection: {
    fontSize: 20,
    fontFamily: "Medium",
    marginLeft: 20,
    textTransform: "capitalize",
  }
})
