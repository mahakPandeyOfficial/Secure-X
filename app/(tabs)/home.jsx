import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import ReportButton from '../../components/Home/ReportButton'
import HelpLine from '../../components/Home/HelplineButton'

export default function home() {
  return (
    <View>
      
      {/**  --------------------Header------------------------------- */}
       <Header />

      {/** ---------------------Report Button------------------------ */}
      <ReportButton />

      {/** --------------------HelpLine Numbers ---------------------- */}
      <HelpLine />

    </View>
  )
}