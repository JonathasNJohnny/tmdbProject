import RoutesApp from './routes/routes.jsx'
import { createGlobalStyle } from 'styled-components';

function App() {

  return (
    <div>
      <GlobalStyle/>
      <RoutesApp/>
    </div>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #252524;
    };
`;