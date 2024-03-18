import { describe, it } from 'node:test'
import { deepStrictEqual } from 'node:assert'
import { sanitizedError } from './index.js'


describe('sanitizedError', () => {
  it('should return an Error instance if given input is an instance of Error', () =>  {
    // Arrange
    const errorMessage = 'error'
    const input = new Error(errorMessage)

    // Act
    const result = sanitizedError(input)

    // Assert
    deepStrictEqual(result instanceof Error, true)
    deepStrictEqual(result.message, errorMessage)
  })

  it('should return an Error instance if given input is a string', () =>  {
    // Arrange
    const input = 'error'

    // Act
    const result = sanitizedError(input)

    // Assert
    deepStrictEqual(result instanceof Error, true)
    deepStrictEqual(result.message, input)
  })

  it('should return an Error instance if given input is an object', () =>  {
    // Arrange
    const input = {
      errorCode: 'error'
    }

    // Act
    const result = sanitizedError(input)

    // Assert
    deepStrictEqual(result instanceof Error, true)
    deepStrictEqual(result.message, JSON.stringify(input))
  })

  it('should return an Error instance with generic message if given input is null', () =>  {
    // Arrange
    const input = null

    // Act
    const result = sanitizedError(input)

    // Assert
    deepStrictEqual(result instanceof Error, true)
    deepStrictEqual(result.message, 'An error occured')
  })
})
