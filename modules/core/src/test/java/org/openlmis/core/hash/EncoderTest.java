package org.openlmis.core.hash;


import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.openlmis.core.hash.Encoder.hash;

public class EncoderTest {

  @Test
  public void shouldHashPasswordBySha512AndUtf8EncodedByBase62() {
    String hashedPassword = "TQskzK3iiLfbRVHeM1muvBCiiKriibfl6lh8ipo91hb74G3OvsybvkzpPI4S3KIeWTXAiiwlUU0iiSxWii4wSuS8mokSAieie";
    String passwordPlainText = "Admin123";

    String encodedPassword = hash(passwordPlainText);
    assertThat(encodedPassword, is(equalTo(hashedPassword)));
    shouldHashNullPasswordToNull();

  }

  @Test
  public void shouldHashNullPasswordToNull() {
    assertThat(hash(null), is(nullValue()));
  }

  @Test
  public void shouldNotContainCharactersNotPermittedByBase62WhenReturningHashPasswordBySha512AndUtf8() throws Exception {
    String passwordPlainText = "Admin123";

    String encodedPassword = hash(passwordPlainText);
    assertThat(encodedPassword.indexOf("/"), is(-1));
    assertThat(encodedPassword.indexOf("="), is(-1));
    assertThat(encodedPassword.indexOf("+"), is(-1));
    shouldHashNullPasswordToNull();

  }
}
