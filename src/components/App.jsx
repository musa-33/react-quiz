import '../styles/App.css'
import Layout from './Layout';
import Home from './pages/Home';
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Home /> */}
        <SignUp />
      </Layout>
    </div>
  );
}

export default App;
