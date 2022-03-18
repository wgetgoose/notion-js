import { Client } from "@notionhq/client"


const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID;

const today = new Date().toISOString().slice(0,10); // this will break

export default async function(event, context, callback) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: { 
          title:[
            {
              text: {
                "content": 'Khan Academy SAT Review'
              }
            }
          ]
        },
        Class: {
            select: {
                name: 'Misc'
            }
        },
        Completion: {
            select: {
                name: 'Assigned'
            }
        },
        'Due Date': {
            date: {
                start: today
            }
        },
        Weight: {
            number: 1
        }
      }
    })
    console.log(response)
    console.log("Success! Entry added.")
    callback(null, { statusCode: 200, body: JSON.stringify(response)});
  } catch (error) {
    console.error(error.body)
    callback(null, { statusCode: 200, body: JSON.stringify(error.body)});

  }
}