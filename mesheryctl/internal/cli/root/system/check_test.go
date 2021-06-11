package system

import (
	"bytes"
	"flag"
	"io/ioutil"
	"os"
	"path/filepath"
	"runtime"
	"testing"

	"github.com/layer5io/meshery/mesheryctl/pkg/utils"
	"github.com/sirupsen/logrus"
)

var update = flag.Bool("update", false, "update golden files")

func TestDefaultPreflightCmd(t *testing.T) {
	SetupContextEnv(t)
	tests := []utils.CmdTestInput{
		{
			Name:             "Run preflight check",
			Args:             []string{"check", "--pre"},
			ExpectedResponse: "check.output.golden",
		},
		{
			Name:             "Run preflight check",
			Args:             []string{"check", "--preflight"},
			ExpectedResponse: "check.output.golden",
		},
	}

	for _, tt := range tests {
		t.Run(tt.Name, func(t *testing.T) {
			rescueStdout := os.Stdout
			r, w, _ := os.Pipe()
			os.Stdout = w

			var buf bytes.Buffer
			logrus.SetOutput(&buf)

			SystemCmd.SetArgs(tt.Args)
			SystemCmd.SetOut(rescueStdout)
			err = SystemCmd.Execute()
			if err != nil {
				t.Error(err)
			}

			w.Close()
			_, _ = ioutil.ReadAll(r)
			os.Stdout = rescueStdout

			output := buf.String()
			t.Log(output)
			actualResponse := utils.TrimLogOutputsTesting(output)
			t.Log(actualResponse)
			// get current directory
			_, filename, _, ok := runtime.Caller(0)
			if !ok {
				t.Fatal("problems recovering caller information")
			}

			currDir := filepath.Dir(filename)
			testdataDir := filepath.Join(currDir, "testdata")
			// testdataDir := filepath.Join(filepath.Dir(filename), tf.dir, tf.name)
			golden := utils.NewGoldenFile(t, tt.ExpectedResponse, filepath.Join(testdataDir, "check"))

			if *update {
				golden.Write(actualResponse)
			}
			expectedResponse := golden.Load()

			if expectedResponse != actualResponse {
				utils.Equals(t, expectedResponse, actualResponse)
				// t.Errorf("expected response %v and actual response %v don't match", expectedResponse, actualResponse)
			}
		})
	}
}
