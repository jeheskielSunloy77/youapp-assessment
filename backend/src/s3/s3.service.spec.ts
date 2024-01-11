import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';

describe('S3Service', () => {
  let service: S3Service;
  const bucketUrl = 'https://test-bucket.s3.us-east-2.amazonaws.com';
  const file = {
    body: Buffer.from('test'),
    key: 'tests/test-file',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file', async () => {
    const putObjectMock = jest.spyOn(service, 'upload');
    putObjectMock.mockResolvedValue({
      url: `${bucketUrl}/${file.key}`,
    });

    const { url, error } = await service.upload(file.body, file.key);

    expect(putObjectMock).toHaveBeenCalledWith(file.body, file.key);
    expect(url).toEqual(`${bucketUrl}/${file.key}`);
    expect(error).toBeUndefined();
  });

  it('should delete file', async () => {
    const deleteObjectMock = jest.spyOn(service, 'delete');
    deleteObjectMock.mockResolvedValue(undefined);
    const error = await service.delete(file.key);

    expect(deleteObjectMock).toHaveBeenCalledWith(file.key);
    expect(error).toBeUndefined();
  });
});
