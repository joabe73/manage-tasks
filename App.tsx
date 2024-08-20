import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {GlobalStateProvider} from './src/contexts/GlobalContext';
import {MainNavigation} from './src/navigation/Navigation';

export { MainNavigation }

// const App = () => {
//   return (
//     <NavigationContainer>
//       <GlobalStateProvider>
//         <MainNavigation />
//       </GlobalStateProvider>
//     </NavigationContainer>
//   );
// };

// export default App;
