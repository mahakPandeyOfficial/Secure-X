import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { check, request, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions';

export default function Index() {
  

  // Redirect to the /home route after permissions check
  return <Redirect href={'/home'} />;
}
