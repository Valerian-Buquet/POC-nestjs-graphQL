import { binding, given, then, when, before } from 'cucumber-tsflow';
import { assert } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { url } from 'inspector';

class Context {
  public app;
  public response;
}

// tslint:disable-next-line:max-classes-per-file
@binding([Context])
export class HelloWorldSteps {
  url: string;
  body: string;
  constructor(protected context: Context) {}

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();
  }

  @given('url {string}')
  public async function1(url: string) {
    return (this.url = url);
  }

  @given('query with body')
  public async function2(body: string) {
    return (this.body = body);
  }

  @when('i post the graphql request')
  public async callToGraphql() {
    console.log('url : ', this.url);
    console.log('body : ', this.body);
    return (this.context.response = await request(
      this.context.app.getHttpServer(),
    )
      .post(this.url)
      .send({ query: this.body }));
  }

  @then('i should have a response node {string}')
  public statusResponse(node: string) {
    assert(this.context.response.res.text.includes(node));
  }
}
