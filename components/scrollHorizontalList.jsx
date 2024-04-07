import { FlatList, TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'


export function ScrollHorizontalList({data, parentNavigation}) {
  const theme = useTheme()
  return(
    <FlatList
      data={data}
      style={{marginBottom: 20,}}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({item, index}) => {
        return(
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => parentNavigation.navigate('chat', {item: item})}
            style={[
              styles.cardAi,
              {
                backgroundColor: theme.colors.secondaryContainer,
                borderWidth: 0,
              }
            ]}
          >
            <Image
              source={item.image}
              style={{
                width: 110,
                height: 140,
                borderRadius: 10,
                marginLeft: 5
              }}
            />
            <View style={styles.containerInfoBot}>
              <Text style={[styles.name, { color: theme.colors.primary}]} >
                {item.first_name.length > 17? item.first_name.slice(0, 14) + "..." : item.first_name}
              </Text>
              <Text style={[styles.desc, {color: theme.colors.secondary}]} >
              {item.desc.length > 100? item.desc.slice(0, 97) + "..." : item.desc}
              </Text>
            </View>
            
          </TouchableOpacity>
        )
      }}

    />
  )
}


const styles = StyleSheet.create({
  cardAi: {
    width: 280,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 3,
  },
  containerInfoBot: {
    width: "60%"
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
    textAlign: "center",
  },
  desc: {
    fontFamily: 'Roboto-Italic',
    fontSize: 12,
    marginHorizontal: 5,
  }
})
