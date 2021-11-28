export class BasicAuth {
  constructor(
    public readonly user: string,
    public readonly pass: string
  ) { }

  static fromHeader(value: string): BasicAuth | null {
    if (!value) return null;
    if (!value.startsWith('Basic ')) return null;
    const decodedHeader = Buffer.from(value.substr('Basic '.length), "base64").toString("utf8");

    const firstColon = decodedHeader.indexOf(":");
    if (firstColon == -1) return null;
    return new BasicAuth(
      decodedHeader.substr(0, firstColon),
      decodedHeader.substr(firstColon + 1)
    );
  }
}