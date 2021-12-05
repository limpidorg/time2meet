import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forTest: ['ElementA', 'ElementB'],
      ifTest: true
    }
  }

  render() {
    return (
      <div className="flex flex-col mx-auto max-w-xl my-10 mx-10 rounded-md shadow-lg font-bold py-4 px-4 bg-gray-100">
        <div className="text-center text-2xl">
          Hello world!
        </div>
        <div className="text-center mt-5">
          {
            this.state.forTest.map((el, index) => {
              return (
                <div className="bg-green-100">For-test! {el}, {index}</div>
              )
            })
          }
        </div>

        <div className="mt-4">
          <div className="flex flex-row justify-center cursor-pointer" onClick={() => {
            this.setState({
              ifTest: !this.state.ifTest
            })
          }}>
            <div className="bg-gray-200 rounded-md px-2 py-2">Toggle</div>
          </div>
          <div className="text-center mt-5">
            {
              this.state.ifTest ?
                <div className="bg-green-100">If-test!</div> :
                <div className="bg-red-100">If-test!</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return new Main()
}

export default App;
