import React, { useState, useCallback, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import TabItem from '@theme/TabItem'
import Admonition from '@theme/Admonition';
import { Icon } from '@iconify/react'
import stringify from "json-stringify-pretty-compact"

import Tabs from '../theme/Tabs'
import Examples from './examples'
import SCHEMA from './apiv2-json-schema.json'

const MIN_HEIGHT = 170
const MAX_HEIGHT = 500

export default function ApiV2Example(props) {
  const [activeTab, setActiveTab] = useState("query")
  const [code, setCode] = useState(Examples[props.request] || "")
  const [canReset, setCanReset] = useState(false)
  const [response, setResponse] = useState(null)

  const onCodeChange = useCallback((code) => {
    setCode(code)
    setCanReset(true)
    setResponse(null)
  })

  const resetCode = useCallback(() => {
    setCode(Examples[props.request] || "")
    setCanReset(false)
    setResponse(null)
  })

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code)
  })

  const runCode = useCallback(async () => {
    setResponse(null)

    const response = await fetch('/api/v2/docs/query', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: code
    })
    const data = await response.json()

    setResponse({
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data
    })

    setActiveTab("response")
  })

  return (
    <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
      <TabItem label="Query" value="query">
        <div style={{ position: "relative" }}>
          <JsonSchemaEditor
            schema={SCHEMA}
            value={code}
            onChange={onCodeChange}
          />
          <div style={{ position: "absolute", top: 2, right: 2 }}>
            {canReset && (
              <button title="Reset query" className="code-button" onClick={resetCode}>
                <Icon icon="carbon:reset-alt" />
              </button>
            )}
            <button title="Copy query" className="code-button" onClick={copyCode}>
              <Icon icon="uil:copy" />
            </button>
            <button title="Run query" className="code-button" onClick={runCode}>
              <Icon icon="ant-design:code-outlined" />
            </button>
          </div>
        </div>
      </TabItem>
      <TabItem label="Example Response" value="example_response">
        <Admonition type="info">
          <p>Example response for this query</p>
        </Admonition>

        <JsonSchemaEditor
          readOnly
          value={Examples[props.response] || ""}
        />
      </TabItem>
      {response && (
        <TabItem label="Response" value="response">
          {response.status !== 200 && (
            <p>Request did not succeed. {response.status} - ${response.statusText}</p>
          )}

          <JsonSchemaEditor
            readOnly
            value={stringify(response.data)}
          />
        </TabItem>
      )}
    </Tabs>
  )
}

function JsonSchemaEditor({ value, schema, onChange, readOnly }) {
  const [height, setHeight] = useState(MIN_HEIGHT)
  const editorRef = useRef()

  const onMount = useCallback((editor, monaco) => {
    editorRef.current = editor

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(schema)
    editor.onDidChangeModelContent(handleEditorChange)
    handleEditorChange()
  })

  const handleEditorChange = useCallback(() => {
    const editAreaHeight = editorRef.current.getContentHeight()
    if (editAreaHeight > height && height < MAX_HEIGHT) {
      setHeight(editAreaHeight)
    }
  }, []);

  return (
    <Editor
      theme="vs-dark"
      language="json"
      value={value}
      height={height}
      options={{
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        fixedOverflowWidgets: true,
        glyphMargin: false,
        wordWrap: 'off',
        lineNumbers: 'on',
        tabFocusMode: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: false,
        scrollBeyondLastLine: false,
        readOnly: readOnly
      }}
      onMount={onMount}
      onChange={onChange}
    />
  )
}