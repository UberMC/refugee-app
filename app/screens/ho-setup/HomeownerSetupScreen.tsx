import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { withFormik } from "formik"

import { NavigatorParamList } from "../../navigators"
import { translate } from "../../i18n"

import {
  HomeownerLocation,
  HomeownerPlace,
  Button,
  Divider,
  HomeownerDetails,
  NumericHeader,
} from "../../components"
import { color } from "../../theme"

interface FormValues {
  details: {
    fullName: string
    email: string
    country: string
    phone: string
  }
  location: {
    addressLine: string
    postal: string
    city: string
    country: string
  }
  place: {
    type: "Lease" | "Owner" | null
    beds: number | null
  }
}

type ScreenProps = StackScreenProps<NavigatorParamList, "ho-setup">

const initialValue: FormValues = {
  details: { country: "", fullName: "", phone: "", email: "" },
  location: { addressLine: "", postal: "", city: "", country: "" },
  place: { type: null, beds: null },
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    marginBottom: 64,
  },
  divider: {
    marginBottom: 24,
    marginTop: 32,
  },
  header: {
    marginBottom: 16,
  },
  lastBlock: {
    marginBottom: 40,
  },
  scrollContainer: {
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
})

const dividerColor = Platform.select({
  ios: color.palette.textDisabled,
  android: color.palette.control,
})

const HomeownerSetupScreenComp: React.FC<ScreenProps> = ({ navigation }) => {
  const handleCreate = React.useCallback(() => {
    navigation.navigate("homeowner")
  }, [])

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="never"
          scrollToOverflowEnabled
          style={styles.scrollContainer}
        >
          <StatusBar barStyle="dark-content" />

          <NumericHeader
            style={styles.header}
            option="1"
            title={translate("screens.ho-setup.1-title")}
            text={translate("screens.ho-setup.1-text")}
          />

          <HomeownerDetails blockName="details" />

          <Divider style={styles.divider} color={dividerColor} />

          <NumericHeader
            style={styles.header}
            option="2"
            title={translate("screens.ho-setup.2-title")}
            text={translate("screens.ho-setup.2-text")}
          />

          <HomeownerLocation blockName="location" />

          <Divider style={styles.divider} color={dividerColor} />

          <NumericHeader
            style={styles.header}
            option="3"
            title={translate("screens.ho-setup.3-title")}
            text={translate("screens.ho-setup.3-text")}
          />

          <HomeownerPlace blockName="place" style={styles.lastBlock} />

          <Button tx="common.next" style={styles.btn} onPress={handleCreate} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export const HomeownerSetupScreen = withFormik<ScreenProps, FormValues>({
  handleSubmit: () => {
    /**/
  },
  mapPropsToValues: () => initialValue,
})(HomeownerSetupScreenComp)
