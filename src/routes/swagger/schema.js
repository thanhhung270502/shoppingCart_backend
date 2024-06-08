/**
 * @swagger
 * components:
 *  schemas:
 *      AccessToken:
 *          type: object
 *          properties:
 *              accessToken:
 *                  type: string
 *          example: 
 *              accessToken: ab.cd.ef
 *      Authentication:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *              password:
 *                  type: string
 *                  format: password
 *          example:
 *              email: example@email.com
 *              password: "123456"       
 *      Id:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *          example: 
 *              id: 1
 *      Response:
 *          type: object
 *          properties:
 *              message:
 *                type: string
 *                example: OK
 *              code:
 *                type: integer  
 *                example: 200
 *      User:
 *          type: object
 *          properties:
 *              role:
 *                  type: string
 *              name:
 *                  type: string
 *              avatar:
 *                  type: string
 *              provider:
 *                  type: string
 *          example:
 *              role: normal
 *              name: NormalUser
 *              avatar: https://example.com/avatar.png
 *              provider: manual
 *      LoginRequest:
 *          $ref: '#/components/schemas/Authentication'
 *      LoginResponse:
 *          allOf:
 *              - $ref: '#/components/schemas/Response'
 *              - properties:
 *                  body:
 *                      allOf:
 *                          - $ref: '#/components/schemas/AccessToken'
 *                          - properties:
 *                              user:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/Id'
 *                                      - $ref: '#/components/schemas/User'
 *                            example:
 *                              user:
 *                                  id: 1
 *                                  role: normal
 *                                  name: NormalUser
 *                                  avatar: https://example.com/avatar.png 
 *                example:
 *                  message: Login successfully completed
 *                  code: 200
 *                  body:
 *                      accessToken: ab.cd.ef
 *                      user:
 *                          id: 1
 *                          role: normal
 *                          name: NormalUser
 *                          avatar: https://example.com/avatar.png               
 *      Language:
 *          allOf:
 *              - $ref: '#/components/schemas/Id'
 *              - properties:
 *                  name:
 *                      type: string
 *                example: 
 *                  name: python
 *      Level:
 *          allOf:
 *              - $ref: '#/components/schemas/Id'
 *              - properties:
 *                  name:
 *                      type: string
 *                example: 
 *                  name: Easy
 *      Problem:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              level_id:
 *                  type: number
 *              description:
 *                  type: string
 *              instruction:
 *                  type: string
 *              likes:
 *                  type: integer
 *              dislikes:
 *                  type: integer
 *              categories:
 *                  type: array
 *                  items:
 *                      type: string
 *              is_public:
 *                  type: boolean
 *          example:
 *              title: Add Two Numbers
 *              level_id: 1
 *              description: Problem Description
 *              instruction: Problem Instruction
 *              likes: 1
 *              dislikes: 1
 *              categories:
 *                  - Array
 *                  - Dynamic Programming
 *              is_public: true
 *      CreateProblemRequest:
 *          allOf:
 *              - $ref: '#/components/schemas/Problem'
 *              - properties:
 *                  problem_languages:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/CreateProblemLanguage'
 *                  testcases:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/CreateTestcase'
 *                example:
 *                  problem_languages:
 *                      - language_id: 1
 *                        initial_code: print("Initial Code")
 *                        solution_code: print("Solution Code")
 *                        full_code: print("Full Code")
 *                  testcases:
 *                      - input: Example input 1
 *                        output: Example output 1
 *                      - input: Example input 2
 *                        output: Example output 2
 *      ExtendedProblem:
 *          allOf: 
 *              - $ref: '#/components/schemas/Problem'
 *              - properties:
 *                  level_name: 
 *                      type: string
 *                example:
 *                  level_name: Easy
 *      FilteredProblem:
 *          type: object
 *          properties:
 *              title: 
 *                 type: string
 *              description: 
 *                 type: string
 *              name: 
 *                 type: string
 *              status: 
 *                 type: string
 *              user_id: 
 *                 type: integer
 *          example:
 *              title: Add Two Numbers
 *              description: Problem Description
 *              name: Easy
 *              status: Todo
 *              user_id: 1
 *      Testcase:
 *          allOf:
 *              - properties:
 *                  problem_id: 
 *                      type: integer
 *                example:
 *                  problem_id: 1
 *              - $ref: '#/components/schemas/CreateTestcase' 
 *      CreateTestcase:
 *          type: object
 *          properties:
 *              input:
 *                  type: string
 *              output:
 *                  type: string
 *              runtime:
 *                  type: number
 *                  format: float
 *              memory:
 *                  type: number
 *                  format: float
 *          example:
 *              input: "1 2"
 *              output: "3"
 *              runtime: 100.1
 *              memory: 100.2
 *      ProblemLanguage:
 *          allOf:
 *              - properties:
 *                  problem_id: 
 *                      type: integer
 *                example:
 *                  problem_id: 1
 *              - $ref: '#/components/schemas/CreateProblemLanguage'
 *      CreateProblemLanguage:
 *          type: object
 *          properties:
 *              language_id: 
 *                  type: integer
 *              initial_code:
 *                  type: string
 *              solution_code:
 *                  type: string
 *              full_code:
 *                  type: string
 *          example: 
 *              language_id: 1
 *              initial_code: print("Initial Code")
 *              solution_code: print("Solution Code")
 *              full_code: print("Full Code")
 *      Submission:
 *          type: object
 *          properties:
 *              language_id: 
 *                  type: integer
 *              user_id:
 *                  type: integer
 *              problem_id:
 *                  type: integer
 *              runtime:
 *                  type: number
 *                  format: float
 *              memory:
 *                  type: number
 *                  format: float
 *              status:
 *                  type: string
 *              datetime:
 *                  type: timestamp
 *              code:
 *                  type: string
 *              score:
 *                  type: number
 *                  format: float
 *          example:
 *              language_id: 1
 *              user_id: 1
 *              problem_id: 1
 *              runtime: 100
 *              memory: 123.4
 *              status: Accepted
 *              datetime: 2024-01-01 00:00:00
 *              code: print("Hello World")
 *              score: 9.9
 *      CreateSubmissionRequest:
 *          allOf:
 *              - $ref: '#/components/schemas/Submission'
 *              - properties:
 *                  wrong_testcase_ids:
 *                      type: array
 *                      items:
 *                          type: integer
 *                example:
 *                  wrong_testcase_ids:
 *                      - 2
 *                      - 3
 */