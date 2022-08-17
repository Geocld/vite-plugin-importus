import React from 'react'
import renderer from 'react-test-renderer'
import Case1 from '../src/components/Case1'
import Case2 from '../src/components/Case2'
import Case3 from '../src/components/Case3'
import Case4 from '../src/components/Case4'

function toJson(component) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result
}

test('Test Case 1', () => {
  const component = renderer.create(
    <Case1/>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Test Case 2', () => {
  const component = renderer.create(
    <Case2/>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Test Case 3', () => {
  const component = renderer.create(
    <Case3/>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Test Case 4', () => {
  const component = renderer.create(
    <Case4/>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Test Case 5', () => {
  const component = renderer.create(
    <Case4/>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})